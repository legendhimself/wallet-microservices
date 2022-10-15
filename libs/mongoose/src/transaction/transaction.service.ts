import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { CreateTransactionDto } from '../dto/create-transaction.dto';
import {
  ITransaction,
  TransactionSchemaName,
} from '../schemas/transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(TransactionSchemaName)
    private transactionModel: Model<ITransaction>,
  ) {}

  async bulkWrite(operations: any[]) {
    return this.transactionModel.bulkWrite(operations);
  }

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<ITransaction> {
    const createdTransaction = await new this.transactionModel(
      createTransactionDto,
    ).save();
    return createdTransaction;
  }

  async findOneByUid(customerId: string) {
    return this.transactionModel.findOne({ customerId }).exec();
  }

  async findByUid(customerId: string) {
    return this.transactionModel.find({ customerId }).exec();
  }
}
