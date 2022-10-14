import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TransactionArrayOut } from '../wallet-api/controllers/dto';
import { WalletService } from './processor.service';

@Controller()
export class WalletController {
  constructor(private readonly service: WalletService) {}

  @MessagePattern({ cmd: 'hello' })
  Hello(data: string): string {
    console.log(data);
    return `${process.pid} said Hi!`;
  }

  @MessagePattern({ cmd: 'processChunk' })
  process(chunk: TransactionArrayOut) {
    console.log('processChunk', chunk);
    return this.service.process(chunk);
  }
}
