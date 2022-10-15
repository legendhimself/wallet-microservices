import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [UserModule],
  exports: [SeederService],
  providers: [SeederService],
})
export class SeederModule {}
