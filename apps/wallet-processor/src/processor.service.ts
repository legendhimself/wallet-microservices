// import { UserService } from '@app/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletService {
  // constructor(private userModule: UserService) {}
  async process() {
    // const { transactions } = chunk;
    // const operations = [];
    // for (let i = 0; i < transactions.length; i++) {
    //   const { value, customerId } = transactions[i];
    //   const user = await this.userModule.findOneByUid(customerId);
    //   if (user) {
    //     const difference = user.credit_card.ballance - value;
    //     if (difference < 0) {
    //       // todo save as unsuccessful transaction
    //     } else {
    //       operations.push({
    //         updateOne: {
    //           filter: { uid: customerId, deleted: false },
    //           update: { 'credit_card.ballance': value },
    //         },
    //       });
    //     }
    //   }
    // }
    return true;
  }
}
