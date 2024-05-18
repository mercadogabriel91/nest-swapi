import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './ExceptionFilter/http-exception.filter';
import * as dotenv from 'dotenv';
import { CognitoExceptionFilter } from './AWS/Cognito/cognito-exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter(), new CognitoExceptionFilter());
  await app.listen(3000);
}
bootstrap();
