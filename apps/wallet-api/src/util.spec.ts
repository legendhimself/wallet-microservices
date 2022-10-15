import { chunkify } from './utils';

describe('Chunkify', () => {
  describe('chunkify', () => {
    it('should return chunkified array of transactions', async () => {
      const result = [
        {
          totalValue: 260,
          timeLeft: 0,
          transactions: [
            {
              value: 200,
              latency: 850,
              customerId: '5c4ed244-5060-42a7-9853-9441e4f2085a',
            },
            {
              value: 40,
              latency: 100,
              customerId: '5c4ed244-5060-42a7-9853-9441e4f2085a',
            },
            {
              value: 20,
              latency: 50,
              customerId: '5c4ed244-5060-42a7-9853-9441e4f2085a',
            },
          ],
        },
        {
          totalValue: 180,
          timeLeft: 150,
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

      expect(
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
      ).toStrictEqual(result);
    });
  });
});
