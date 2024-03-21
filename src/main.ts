import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'fatal', 'error', 'warn', 'debug'],
  });
  try {
    app.setGlobalPrefix('api/v1');
    await app.listen(3000);
    Logger.log(`Successfully started on port:${3000}`);
  } catch (error) {
    Logger.error(error);
  }
}
bootstrap();
