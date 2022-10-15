import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { TcpEvents } from '../../../config/tcp.enums';
import { TransactionArrayOut } from '../../../config/dto';
import { WalletService } from './processor.service';

@Controller()
export class WalletController {
  constructor(private readonly service: WalletService) {}

  @EventPattern(TcpEvents.ProcessChunk)
  process(chunk: TransactionArrayOut[]) {
    return this.service.process(chunk);
  }
}
