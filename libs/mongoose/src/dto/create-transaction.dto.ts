import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  customerId!: string;

  @IsNumber()
  value!: number;

  @IsNumber()
  latency!: number;

  @IsBoolean()
  success!: boolean;
}
