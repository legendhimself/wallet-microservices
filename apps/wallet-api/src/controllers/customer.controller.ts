import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';

import { Headers } from '@nestjs/common';
import { EditUserDto } from '../../../../config/dto/user-patch.dto';
import { ApiService } from '../api.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
@ApiTags('User')
@Controller('customer')
export class CustomerController {
  constructor(private readonly apiService: ApiService) {}
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns customers name and if authorized ballance',
  })
  async customer(
    @Param('id') id: string,
    @Headers() headers: Request['headers'],
  ) {
    const { first_name, last_name, ballance } = await this.apiService.getUser(
      id,
      true,
    );
    if (await this.apiService.isAuthenticated(headers.authorization)) {
      return {
        first_name,
        last_name,
        ballance,
      };
    }
    return {
      first_name,
      last_name,
    };
  }

  @ApiResponse({
    status: 200,
    description: 'Deletes a customers, If deleted returns true else false',
  })
  @Delete(':id')
  deleteCustomer(@Param('id') id: string) {
    return this.apiService.softDelete(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Updates customers name and ballance',
  })
  @Patch(':id')
  updateCustomer(@Param('id') id: string, @Body() data: EditUserDto) {
    return this.apiService.updateUser(id, {
      first_name: data.first_name,
      last_name: data.last_name,
      credit_card: { ballance: data.credit_card.ballance },
    });
  }
}
