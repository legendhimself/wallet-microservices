import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@app/mongoose';
import {
  EditUserDto,
  TransactionArray,
  TransactionArrayOut,
} from '../../../config/dto';

@Injectable()
export class ApiService {
  constructor(
    private userModule: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async isAuthenticated(token: string) {
    try {
      const { uid } = this.jwtService.verify(token.replace(/^Bearer\s+/, ''), {
        secret: this.config.get('JWT_SECRET'),
      });
      const exists = await this.userModule.userExists(uid);
      return !!uid && exists;
    } catch (e) {
      return false;
    }
  }

  async getUser(id: string, authorized: boolean) {
    const resp = await this.userModule.findOneByUid(id);
    return authorized
      ? {
          first_name: resp?.first_name,
          last_name: resp?.last_name,
          balance: resp?.credit_card?.ballance,
        }
      : {};
  }

  softDelete(id: string) {
    return this.userModule.softDeleteUser(id);
  }

  async updateUser(id: string, data: EditUserDto) {
    const update = {
      first_name: data.first_name,
      last_name: data.last_name,
      'credit_card.ballance': data.credit_card.ballance,
    };
    const a = await this.userModule.updateOneByUid(id, update);
    if (!a) return { message: 'User not found' };
    return a;
  }

  chunkify(data: TransactionArray[]): TransactionArrayOut[] {
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
  }
}
