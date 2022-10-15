import { Schema, SchemaTypes, type InferSchemaType } from 'mongoose';

export const TransactionSchemaName = 'Transaction';

export const TransactionSchema = new Schema(
  {
    customerId: {
      required: true,
      type: SchemaTypes.String,
    },
    value: {
      required: true,
      type: SchemaTypes.Number,
    },
    latency: {
      required: true,
      type: SchemaTypes.Number,
    },
    success: {
      required: true,
      type: SchemaTypes.Boolean,
    },

    retried: {
      type: SchemaTypes.Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export type ITransaction = InferSchemaType<typeof TransactionSchema>;
