import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.ORIGIN || 'http://localhost:3000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Boostrap');

  app.enableCors({
    origin: ORIGIN,
    methods: 'POST',
  });
  app.use(helmet());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(PORT);
  logger.log(`App running on port: ${PORT}`);
}
bootstrap();
