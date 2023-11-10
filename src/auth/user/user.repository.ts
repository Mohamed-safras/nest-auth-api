import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/database/abstract.repository';
import { UserDocument, UserSchema } from './model/user.schama';

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}

export const UserDocumentModel = MongooseModule.forFeature([
  { name: UserDocument.name, schema: UserSchema },
]);
