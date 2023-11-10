import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { Response } from 'express';
import { SETTINGS } from 'src/utils/common.utils';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user-decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from './user/dto/create.user.dto';
import { UserDocument } from './user/model/user.schama';
import { UserService } from './user/user.service';

@Controller('users')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  @UsePipes(SETTINGS.VALIDATION_PIPE)
  async register(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);

    response.send({ email: user.email, name: user.name });
  }
}
