import {
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  uid!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  gender!: string;

  @ApiProperty()
  @IsString()
  phone_number!: string;

  @ApiProperty()
  @IsString()
  social_insurance_number!: string;

  @ApiProperty()
  @IsString()
  avatar!: string;

  @ApiProperty()
  @IsDateString()
  date_of_birth!: Date;

  @ApiProperty()
  employment!: {
    title?: string;
    key_skill?: string;
  };

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  credit_card!: {
    ballance?: number;
    cc_number?: string;
  };

  @ApiProperty()
  address!: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    coordinates?: {
      lng?: number;
      lat?: number;
    };
  };
}
