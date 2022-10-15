import { IsNotEmpty, IsString, IsObject, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class Card {
  @IsNotEmpty()
  @IsNumber()
  ballance!: number;

  cc_number?: number;
}

export class EditUserDto {
  @IsString()
  @IsNotEmpty()
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  last_name!: string;

  @IsObject()
  @Type(() => Card)
  credit_card!: Card;
}
