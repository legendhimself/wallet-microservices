import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

export type TransactionArrayOut = {
  totalValue: number;
  timeLeft: number;
  transactions: { value: number; latency: number; customerId: string }[];
};

export class TransactionArray {
  @IsNumber()
  value!: number;

  @IsNumber()
  latency!: number;
}

export class TransactionArrayInput {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionArray)
  data!: TransactionArray[];
}
