import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'config/configuration';
import { validationSchema } from 'config/validation';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './auth/user/user.module';
import { DataBaseModule } from './database/database.module';

const env = process.env.NODE_ENV;
const envPath = `.env.${env}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: !env ? '.env' : envPath.trim(),
      validationSchema: validationSchema,
      isGlobal: true,
    }),
    DataBaseModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
