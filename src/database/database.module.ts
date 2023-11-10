import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongo_url.connectionString'),
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  exports: [MongooseModule],
})
export class DataBaseModule {}
