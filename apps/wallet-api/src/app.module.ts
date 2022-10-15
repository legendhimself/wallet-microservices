import { SeederModule, UserModule, UserService } from '@app/mongoose';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ApiModule } from './api.module';
const logger = new Logger('AppModule');
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
    UserModule,
    ApiModule,
    SeederModule,
  ],
  providers: [UserService],
})
export class AppModule {}
