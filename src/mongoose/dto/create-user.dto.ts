import {
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  uid!: string;

  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  first_name!: string;
  @IsNotEmpty()
  @IsString()
  last_name!: string;

  @IsNotEmpty()
  @IsString()
  gender!: string;

  @IsString()
  phone_number!: string;

  @IsString()
  social_insurance_number!: string;

  @IsString()
  avatar!: string;

  @IsDateString()
  date_of_birth!: Date;

  employment!: {
    title?: string;
    key_skill?: string;
  };

  @IsObject()
  @ValidateNested()
  credit_card!: {
    ballance?: number;
    cc_number?: string;
  };

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
