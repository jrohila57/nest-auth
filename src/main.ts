import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DEVELOPMENT, LOGGER as logger, PRODUCTION } from './core/constant';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { logger });
    const config: ConfigService = app.get(ConfigService);
    const PORT = config.get<number>('PORT')!;
    const NODE_ENV = config.get<string>('NODE_ENV');
    const BASE_URL = config.get<string>('BASE_URL');
    const API_VERSION = config.get<string>('API_VERSION')!;
    app.setGlobalPrefix(API_VERSION);
    const options = new DocumentBuilder()
      .setTitle('CRUD API WITH AUTH')
      .setDescription('Basic Auth Crud API with nest.js and sequelize')
      .setVersion('1.0')
      .addServer('http://localhost:3000/', DEVELOPMENT)
      .addServer('https://localhost:3005/', PRODUCTION)
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
    await app.listen(PORT);
    Logger.log(`Server is in ${NODE_ENV?.toUpperCase()} mode`, 'WEB');
    Logger.log(`Server started on ${BASE_URL} port:${PORT}`, 'WEB');
  } catch (error) {
    Logger.error(error);
  }
}
bootstrap();
