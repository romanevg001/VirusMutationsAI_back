import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

import { ValidationPipe } from './shared/validation.pipe';
import * as config from 'config';

const serverConfig = config.get('server');
const port = process.env.PORT || serverConfig.port;

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if (process.env.MODE === 'development') {
    logger.log(`enableCors in development mode`);
    app.enableCors();
  } else {
    logger.log(`Accepting requests from origin "${serverConfig.origin}" `);
    app.enableCors({
      origin: serverConfig.origin,
    });
  }

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log('Run on port:' + port);

}
bootstrap();
