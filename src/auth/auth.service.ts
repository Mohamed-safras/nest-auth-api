import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { TokenPayLoad } from './interfaces/token-payload.interfaces';
import { UserDocument } from './user/model/user.schama';
import { UserService } from './user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDocument, response: Response) {
    const tokenPayLoad: TokenPayLoad = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get<number>('jwt.expiresIn'),
    );

    const token = this.jwtService.sign(tokenPayLoad);

    response.cookie('Authentication', token, { httpOnly: true, expires });
  }

  async verifyUserCredentials(
    email: string,
    password: string,
  ): Promise<UserDocument> {
    const user = await this.userService.getUserByEmail(email);
    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Incorrect username or password.');

    return user;
  }
}
