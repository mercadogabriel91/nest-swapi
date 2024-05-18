// lambda.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as awsServerlessExpress from 'aws-serverless-express';
import { HttpExceptionFilter } from './src/ExceptionFilter/http-exception.filter';
import * as dotenv from 'dotenv';
import { CognitoExceptionFilter } from './src/AWS/Cognito/cognito-exception.filter';

dotenv.config();

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.useGlobalFilters(new HttpExceptionFilter(), new CognitoExceptionFilter());
  await app.init();
  return app;
};

export const handler = async (event: any, context: any) => {
  const app = await bootstrap();
  const server = awsServerlessExpress.createServer(
    app.getHttpAdapter().getInstance(),
  );
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
