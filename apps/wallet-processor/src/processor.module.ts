import { UserModule, UserService } from '@app/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { WalletController } from './processor.controller';
import { WalletService } from './processor.service';

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
          console.log('DB connected');
        });
        connection.on('disconnected', () => {
          console.log('DB disconnected');
        });
        connection.on('error', (error: any) => {
          console.log('DB connection failed! Error: ', error);
        });

        console.log('DB', states[connection.readyState]);
        return connection;
      },
    }),
    UserModule,
  ],
  controllers: [WalletController],
  providers: [UserService, WalletService],
})
export class AppModule {}
