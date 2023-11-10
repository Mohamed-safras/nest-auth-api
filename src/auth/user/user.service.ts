import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordMismatchException } from 'src/utils/exceptions';
import { CreateUserDto } from './dto/create.user.dto';
import { GetUserDto } from './dto/get.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserDocument } from './model/user.schama';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  protected readonly logger = new Logger();
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      if (createUserDto.password !== createUserDto.confirmPassword) {
        throw new PasswordMismatchException();
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      await this.validateCreateUserDto(createUserDto);

      return this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
    } catch (error) {
      if (error instanceof PasswordMismatchException) {
        return {
          message: error.message,
          statusCode: error.getStatus(),
        };
      }
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async getUser(getUserDto: GetUserDto) {
    return await this.userRepository.findOne(getUserDto);
  }

  async updateUser(filterQuery: UserDocument, updateUserDto: UpdateUserDto) {
    await this.validateUpdateUserDto(updateUserDto);
    return await this.userRepository.findOneAndUpdate(
      filterQuery,
      updateUserDto,
    );
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.userRepository.findOne({ email: createUserDto.email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists');
  }

  private async validateUpdateUserDto(updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.findOne({ email: updateUserDto.email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists');
  }
}
