import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../mongoose/user/user.service';
import { TransactionArrayOut } from '../wallet-api/controllers/dto';

@Injectable()
export class WalletService {
  constructor(private userModule: UserService, private config: ConfigService) {}

  async process(chunk: TransactionArrayOut) {
    const { transactions } = chunk;
    const operations = [];
    for (let i = 0; i < transactions.length; i++) {
      const { value, customerId } = transactions[i];
      const user = await this.userModule.findOneByUid(customerId);
      if (user) {
        const difference = user.credit_card.ballance - value;
        if (difference < 0) {
          // todo save as unsuccessful transaction
        } else {
          operations.push({
            updateOne: {
              filter: { uid: customerId, deleted: false },
              update: { 'credit_card.ballance': value },
            },
          });
        }
      }
    }
    return this.userModule.bulkWrite(operations);
  }
}
