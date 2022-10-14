import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, ServerTCP } from '@nestjs/microservices';
import { JwtGuard } from '../../wallet-api/auth/guard';
import { ApiService } from '../api.service';
import { TransactionArrayInput } from './dto';

@Controller()
export class TransactionController extends ServerTCP {
  constructor(
    private readonly apiService: ApiService,
    @Inject('PROCESSOR') private readonly communicationClient: ClientProxy,
  ) {
    super({});
  }

  @UseGuards(JwtGuard)
  @Post('transaction')
  transaction(@Body() body: TransactionArrayInput) {
    const patterns = [...this.messageHandlers.keys()];
    console.log(patterns);
    // this.communicationClient.send(
    //   'hello',
    //   `${process.pid} WALLET API said Hi!`,
    // );

    const chunkified = this.apiService.chunkify(
      body.data.sort((a, b) => b.latency - a.latency),
    );
    return this.communicationClient.send('processChunk', chunkified);
  }
}
