import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TransactionArrayInput } from '../../../../config/dto';
import { ApiService } from '../api.service';
import { JwtGuard } from '../auth/guard';

@Controller()
export class TransactionController {
  constructor(
    private readonly apiService: ApiService,
    @Inject('PROCESSOR') private readonly communicationClient: ClientProxy,
  ) {}

  @UseGuards(JwtGuard)
  @Post('transaction')
  transaction(@Body() body: TransactionArrayInput) {
    this.communicationClient.send(
      { cmd: 'hello' },
      `${process.pid} WALLET API said Hi!`,
    );

    // const chunkified = this.apiService.chunkify(
    //   body.data.sort((a, b) => b.latency - a.latency),
    // );
    // return this.communicationClient.send('processChunk', chunkified);
    return body;
  }
}
