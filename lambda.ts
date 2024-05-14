// lambda.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as awsServerlessExpress from 'aws-serverless-express';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
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
