import { TransactionArray, TransactionArrayOut } from 'config/dto';

export const chunkify = (data: TransactionArray[]) => {
  data = data.sort((a, b) => b.latency - a.latency);
  const limit = 1_000;
  const output: TransactionArrayOut[] = [];
  const done: TransactionArray[] = [];
  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    const temp: any = [];
    for (let j = i; j < data.length; j++) {
      if (sum + data[j].latency <= limit && !done.includes(data[j])) {
        sum += data[j].latency;
        done.push(data[j]);
        temp.push(data[j]);
      }
    }
    if (temp.length > 0) {
      const out = temp.reduce(
        (pre: any, cur: any) => ({
          totalValue: pre.totalValue + cur.value,
          timeLeft: pre.timeLeft - cur.latency,
          transactions: [...pre.transactions, cur],
        }),
        {
          value: 0,
          totalValue: 0,
          timeLeft: 1000,
          latency: 0,
          transactions: [],
        },
      );

      output.push(out);
    }
  }

  return output.sort((a, b) => b.totalValue - a.totalValue);
};
