import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: false,
  });
  const logger = app.get(Logger);
  const config = app.get<ConfigService>(ConfigService);
  const PORT = config.get('port');

  app.enableCors({ credentials: true, origin: true }); // shut down cors global
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  const userConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('User')
    .setVersion('1.0.0')
    .build();

  const userDocs = SwaggerModule.createDocument(app, userConfig);

  SwaggerModule.setup('docs/user', app, userDocs, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(PORT, () => logger.log(`Server started on port: ${PORT}`));
}

bootstrap();
