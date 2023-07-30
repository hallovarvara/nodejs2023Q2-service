import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app/app.module';
import { PORT_DEFAULT } from '@/lib/constants';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    rawBody: true,
  });
  await app.listen(process.env.PORT || PORT_DEFAULT);
}

bootstrap();
