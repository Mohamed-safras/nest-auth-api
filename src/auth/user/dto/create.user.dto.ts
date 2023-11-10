import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGE, REGEX } from 'src/utils/common.utils';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGE.PASSWORD_RULE_MESSAGE,
  })
  password: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGE.PASSWORD_RULE_MESSAGE,
  })
  confirmPassword: string;
}
