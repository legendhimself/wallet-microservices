import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { stat } from 'fs/promises';
import { Connection } from 'mongoose';
import { Readable } from 'stream';
import { promisify } from 'util';

import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createWriteStream } from 'fs';

import { ConfigService } from '@nestjs/config';
import { exec } from 'child_process';
const runCommand = promisify(exec);

@Injectable()
export class SeederService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private config: ConfigService,
  ) {}

  async seed() {
    const db = this.connection.db;
    const count = await db.collection('users').estimatedDocumentCount();
    if (count < 10) {
      console.log('Seeding...', count);
      await this.getData();

      const { stderr, stdout } = await runCommand(
        `mongoimport  ${this.config.get(
          'DB_URI',
        )} --collection users --drop --jsonArray --batchSize 100 --file db-snapshot.json`,
      );
      console.log('Seeding done.');
      if (stderr) console.error(stderr);
      else console.log(stdout);
    } else console.log('Seeding already done.');
  }

  async getData() {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const fileStat = await stat('db-snapshot.json').catch(() => ({
          size: 0,
        }));
        // fetch from bucket once
        if (fileStat.size > 10) return resolve(true);
        console.log('Fetching data from bucket.');
        const bucket = new S3Client({
          region: 'eu-central-1',
          signer: { sign: async (request) => request },
        });
        const createSt = createWriteStream('./db-snapshot.txt');
        const finalSt = createWriteStream('./db-snapshot.json');

        const st = await bucket.send(
          new GetObjectCommand({
            Bucket: 'nt-interview-files',
            Key: 'data.json',
          }),
        );
        const readable = st.Body as Readable;

        let lastEle = '';
        finalSt.write('[');
        readable.on('data', (d) => {
          if (lastEle) finalSt.write(lastEle);
          const chunk = d.toString().split('\n').join(',\n');
          lastEle = chunk;
        });

        readable.on('end', async () => {
          finalSt.write(lastEle.trim().replace(/,$/, ''));
          finalSt.write('\n]');
          finalSt.end();
          console.log('Fetching done.');
          resolve(true);
        });

        readable.pipe(createSt);
      } catch (error) {
        reject(error);
      }
    });
  }
}
