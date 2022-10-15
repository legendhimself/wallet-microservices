import { inspect } from 'util';

const chunkify = (data) => {
  const limit = 1_000;
  const output = [];
  const done = [];
  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    const temp = [];
    for (let j = i; j < data.length; j++) {
      if (sum + data[j].latency <= limit && !done.includes(data[j])) {
        sum += data[j].latency;
        done.push(data[j]);
        temp.push(data[j]);
      }
    }
    if (temp.length > 0) {
      const out = temp.reduce(
        (pre, cur) => ({
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

console.log(
  inspect(
    chunkify([
      {
        value: 110,
        latency: 600,
        customerId: '5c4ed244-5060-42a7-9853-9441e4f2085a',
      },
      {
        value: 70,
        latency: 250,
        customerId: '5c4ed244-5060-42a7-9853-9441e4f2085a',
      },
      {
        value: 200,
        latency: 850,
        customerId: '5c4ed244-5060-42a7-9853-9441e4f2085a',
      },
      {
        value: 120,
        latency: 1000,
        customerId: '5c4ed244-5060-42a7-9853-9441e4f2085a',
      },
      {
        value: 20,
        latency: 50,
        customerId: '5c4ed244-5060-42a7-9853-9441e4f2085a',
      },
      {
        value: 40,
        latency: 100,
        customerId: '5c4ed244-5060-42a7-9853-9441e4f2085a',
      },
    ]),
    { depth: 10 },
  ),
);

const a = [
  {
    totalValue: 240,
    timeLeft: 0,
    transactions: [
      {
        value: 110,
        latency: 600,
        customerId: '5c4ed244-5060-42a7-9853-9441e4f2085a',
      },
      {
        value: 70,
        latency: 250,
        customerId: '5c4ed244-5060-42a7-9853-9441e4f2085a',
      },
      {
        value: 20,
        latency: 50,
        customerId: '5c4ed244-5060-42a7-9853-9441e4f2085a',
      },
      {
        value: 40,
        latency: 100,
        customerId: '5c4ed244-5060-42a7-9853-9441e4f2085a',
      },
    ],
  },
  {
    totalValue: 200,
    timeLeft: 150,
    transactions: [
      {
        value: 200,
        latency: 850,
        customerId: '5c4ed244-5060-42a7-9853-9441e4f2085a',
      },
    ],
  },
  {
    totalValue: 120,
    timeLeft: 0,
    transactions: [
      {
        value: 120,
        latency: 1000,
        customerId: '5c4ed244-5060-42a7-9853-9441e4f2085a',
      },
    ],
  },
];
