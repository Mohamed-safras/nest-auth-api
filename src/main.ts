import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('HCAI Auth Service')
    .setDescription('The Auth Service API description')
    .setVersion('1.0')
    .addTag('Authentication')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get<number>('port'));
}
bootstrap();
