import { UserModule } from '@app/mongoose';
import { Module } from '@nestjs/common';
import { CustomerController, TransactionController } from './controllers';

import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiService } from './api.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ClientsModule.register([
      {
        name: 'PROCESSOR',
        transport: Transport.TCP,
        options: { host: '0.0.0.0', port: 3081 },
      },
    ]),
  ],
  controllers: [TransactionController, CustomerController],
  providers: [ApiService, JwtService],
})
export class ApiModule {}
