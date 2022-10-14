import { Controller, Get, Delete, Patch, Body, Param } from '@nestjs/common';

import { ApiService } from '../api.service';
import { EditUserDto } from './dto/user-patch.dto';
import { Headers } from '@nestjs/common';

@Controller('customer')
export class CustomerController {
  constructor(private readonly apiService: ApiService) {}
  @Get(':id')
  async customer(@Param('id') id: string, @Headers() headers: any) {
    const { first_name, last_name, balance } = await this.apiService.getUser(
      id,
      true,
    );

    if (await this.apiService.isAuthenticated(headers.authorization)) {
      return {
        first_name,
        last_name,
        balance,
      };
    }
    return {
      first_name,
      last_name,
    };
  }

  @Delete(':id')
  deleteCustomer(@Param('id') id: string) {
    return this.apiService.softDelete(id);
  }

  @Patch(':id')
  updateCustomer(@Param('id') id: string, @Body() data: EditUserDto) {
    return this.apiService.updateUser(id, {
      first_name: data.first_name,
      last_name: data.last_name,
      credit_card: { ballance: data.credit_card.ballance },
    });
  }
}
