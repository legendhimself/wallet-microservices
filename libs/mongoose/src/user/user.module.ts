import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SchemaName, UserSchema } from '../schemas/user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SchemaName, schema: UserSchema }]),
  ],
  exports: [
    UserService,
    MongooseModule.forFeature([{ name: SchemaName, schema: UserSchema }]),
  ],
  providers: [UserService],
})
export class UserModule {}
