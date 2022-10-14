import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { SchemaName, UserSchema } from '../schemas/user.schema';

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
