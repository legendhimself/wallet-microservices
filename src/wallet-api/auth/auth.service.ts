import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { v4 } from 'uuid';
import { AuthDto } from './dto/auth.dto';

import { CreateUserDto } from '../../mongoose/dto/create-user.dto';
import { UserService } from '../../mongoose/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userModule: UserService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: CreateUserDto) {
    const hash = await argon.hash(dto.password);
    dto.password = hash;
    dto.uid = v4();
    try {
      const user = await this.userModule.create(dto);
      if (user) return this.signToken(user.uid, user.email);
    } catch (error: any) {
      if (error?.code === 11000)
        throw new BadRequestException('User already exists');
      throw error;
    }
  }

  async signIn(dto: AuthDto) {
    // find the user by email
    const user = await this.userModule.findOneByEmail(dto.email);
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('User Does Not exists.');

    // compare password
    const pwMatches = await argon.verify(user.password ?? '', dto.password);

    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.uid, user.email);
  }

  async signToken(
    userId: string | undefined,
    email: string | undefined,
  ): Promise<{ access_token: string; uid: string }> {
    if (!userId || !email) throw new BadRequestException('Invalid user');
    const payload = {
      uid: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
      uid: userId,
    };
  }
}
