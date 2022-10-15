import { TransactionService, UserService } from '@app/mongoose';
import { Injectable } from '@nestjs/common';
import { TransactionArrayOut } from '../../../config/dto';

@Injectable()
export class WalletService {
  constructor(
    private transactionModule: TransactionService,
    private userService: UserService,
  ) {}
  async process(chunk: TransactionArrayOut[]) {
    const transactionOperations = [];
    const userOperations = [];
    for (let i = 0; i < chunk.length; i++) {
      const { transactions } = chunk[i];
      for (let j = 0; j < transactions.length; j++) {
        const { value, customerId } = transactions[j];
        const user = await this.userService.findOneByUid(customerId);
        if (user) {
          const difference = user.credit_card.ballance - value;
          if (difference < 0) {
            transactionOperations.push({
              insertOne: { document: { ...transactions[j], success: false } },
            });
          } else {
            userOperations.push({
              updateOne: {
                filter: { uid: customerId, deleted: false },
                update: { $inc: { 'credit_card.ballance': -value } },
              },
            });
            transactionOperations.push({
              insertOne: { document: { ...transactions[j], success: true } },
            });
          }
        }
      }
    }
    await this.transactionModule.bulkWrite(transactionOperations);
    await this.userService.bulkWrite(userOperations);

    return true;
  }
}
