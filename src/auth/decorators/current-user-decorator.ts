import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from '../user/model/user.schama';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
