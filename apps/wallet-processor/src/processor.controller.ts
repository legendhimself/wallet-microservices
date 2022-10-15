import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { TransactionArrayOut } from '../wallet-api/controllers/dto';
import { WalletService } from './processor.service';

@Controller()
export class WalletController {
  constructor(private readonly service: WalletService) {}

  @MessagePattern({ cmd: 'hello' })
  hello(data: string): string {
    console.log(data);
    return `${process.pid} said Hi!`;
  }

  //   @MessagePattern({ cmd: 'processChunk' })
  //   process(chunk: any) {
  //     console.log('processChunk', chunk);
  //     return this.service.process(chunk);
  //   }
}
