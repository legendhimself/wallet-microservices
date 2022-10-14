import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createWriteStream } from 'fs';
import { stat } from 'fs/promises';

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
    CopySource: 'nt-interview-files/data.json',
  }),
);
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1_024));
  return `${parseFloat((bytes / Math.pow(1_024, i)).toFixed(2))} ${sizes[i]}`;
};

finalSt.write('[');
st.Body.on('data', (d) =>
  finalSt.write(d.toString().split('\n{').join(',\n{')),
);

setInterval(async () => {
  const s = await stat('./db-snapshot.json');
  console.log(formatBytes(s.size));
}, 5000);

st.Body.on('end', async () => {
  finalSt.write(']');
  finalSt.end();
  console.log('done');
});

st.Body.pipe(createSt);
