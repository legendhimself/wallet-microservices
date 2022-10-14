import { Module } from '@nestjs/common';
import { UserModule } from '../mongoose/user/user.module';
import { UserService } from '../mongoose/user/user.service';
import { WalletController } from './processor.controller';
import { WalletService } from './processor.service';

@Module({
  imports: [UserModule],
  controllers: [WalletController],
  providers: [UserService, WalletService],
})
export class ProcessorModule {}
