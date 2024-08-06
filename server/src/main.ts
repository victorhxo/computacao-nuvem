import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const host = process.env.BACK_URL || `http://localhost`;

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);

  console.log(`Application is running on: ${host}:${port}`);
}
bootstrap();
