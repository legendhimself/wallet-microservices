import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { stat } from 'fs/promises';
import { Connection } from 'mongoose';
import { promisify } from 'util';

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
      // users --drop --jsonArray --batchSize 1 --file ./users.json
      const { stderr, stdout } = await runCommand(
        `mongoimport  ${this.config.get(
          'DB_URI',
        )} --collection users --drop --jsonArray --batchSize 100 --file db-snapshot.json`,
      );
      console.log('Seeding Done');
      console.log(stderr, stdout);
    }
  }

  async getData() {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const fileStat = await stat('db-snapshot.json');
        // fetch from bucket once
        if (fileStat.size > 0) return resolve(true);

        // const bucket = new S3Client({
        //   region: 'eu-central-1',
        //   signer: { sign: async (request) => request },
        // });

        // const createSt = createWriteStream('./db-snapshot.json');
        // const response = await bucket.send(
        //   new GetObjectCommand({
        //     Bucket: 'nt-interview-files',
        //     Key: 'data.json',
        //   }),
        // );
        // if (response.Body) {
        //   createSt.on('finish', () => resolve(true));
        //   (response.Body as Stream).pipe(createSt);
        // }
      } catch (error) {
        reject(error);
      }
    });
  }
}
