import { SeederModule, UserModule, UserService } from '@app/mongoose';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { MongooseModule } from '@nestjs/mongoose';
import { MicroServices } from 'config/tcp.enums';
import { Connection } from 'mongoose';
import { ApiService } from './api.service';
import { AuthModule } from './auth/auth.module';
import { CustomerController, TransactionController } from './controllers';
const logger = new Logger('AppModule');

const clients = ClientsModule.register([
  {
    name: MicroServices.Processor,
    transport: Transport.TCP,
  },
]);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI ?? '', {
      connectionFactory: (connection: Connection) => {
        const states = {
          0: 'disconnected',
          1: 'connected',
          2: 'connecting',
          3: 'disconnecting',
          99: 'uninitialized',
        };
        connection.on('connected', () => {
          logger.log('DB connected');
        });
        connection.on('disconnected', () => {
          logger.log('DB disconnected');
        });
        connection.on('error', (error: any) => {
          logger.log('DB connection failed! Error: ', error);
        });

        logger.log(`DB ${states[connection.readyState]}`);
        return connection;
      },
    }),
    clients,
    UserModule,
    SeederModule,
    AuthModule,
  ],
  controllers: [TransactionController, CustomerController],
  providers: [UserService, ApiService, JwtService],
  exports: [clients],
})
export class AppModule {}
