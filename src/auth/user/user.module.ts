import { Module } from '@nestjs/common';

import { DataBaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { UserDocumentModel, UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [DataBaseModule, UserDocumentModel],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
