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
import { ApiResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller()
export class TransactionController {
  constructor(
    private readonly apiService: ApiService,
    @Inject(MicroServices.Processor)
    private readonly communicationClient: ClientProxy,
  ) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description:
      'Processes a pile of transactions. If dispatched for processing it returns acknowledge as true else false and chunkified array sorted by highest value.',
  })
  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Post('transaction')
  transaction(@Body() body: TransactionArrayInput) {
    try {
      const chunkified = this.apiService.chunkify(body.data);
      this.communicationClient.emit(TcpEvents.ProcessChunk, chunkified);
      return { acknowledged: true, chunkified };
    } catch (error) {
      return {
        acknowledged: false,
        error: (error as Error).message ?? error,
      };
    }
  }
}
