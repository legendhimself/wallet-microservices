import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from '../mongoose/user/user.module';
import { CustomerController, TransactionController } from './controllers/';

import { JwtService } from '@nestjs/jwt';
import { ProcessorModule } from '../wallet-processor/processor.module';
import { ApiService } from './api.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROCESSOR',
        transport: Transport.TCP,
      },
    ]),

    UserModule,
    AuthModule,
    ProcessorModule,
  ],
  controllers: [TransactionController, CustomerController],
  providers: [ApiService, JwtService],
})
export class ApiModule {}
