import { Controller, Get, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../decorators/current-user-decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserDocument } from './model/user.schama';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }

  // @Put('/update')
  // @UsePipes(SETTINGS.VALIDATION_PIPE)
  // @UseGuards(JwtAuthGuard)
  // async updateUser(
  //   @CurrentUser() user: UserDocument,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return this.userService.updateUser(user, updateUserDto);
  // }
}
