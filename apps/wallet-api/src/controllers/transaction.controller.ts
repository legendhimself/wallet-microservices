import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroServices, TcpEvents } from '../../../../config/tcp.enums';
import { TransactionArrayInput } from '../../../../config/dto';
import { ApiService } from '../api.service';
import { JwtGuard } from '../auth/guard';

@Controller()
export class TransactionController {
  constructor(
    private readonly apiService: ApiService,
    @Inject(MicroServices.Processor)
    private readonly communicationClient: ClientProxy,
  ) {}

  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Post('transaction')
  transaction(@Body() body: TransactionArrayInput) {
    try {
      const chunkified = this.apiService.chunkify(
        body.data.sort((a, b) => b.latency - a.latency),
      );
      this.communicationClient.emit(TcpEvents.ProcessChunk, chunkified);
      return { acknowledged: true };
    } catch (error) {
      return {
        acknowledged: false,
        error: (error as Error).message ?? error,
      };
    }
  }
}
