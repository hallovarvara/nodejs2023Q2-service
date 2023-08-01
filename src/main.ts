import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app/app.module';
import { PORT_DEFAULT } from '@/lib/constants';
import { addSwaggerModule } from '@/lib/utils/add-swagger-module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    rawBody: true,
  });

  await addSwaggerModule(app);

  const port = process.env.PORT || PORT_DEFAULT;

  await app.listen(port, () => {
    console.log(`API: http://localhost:${port}`);
    console.log(`Doc: http://localhost:${port}/doc`);
  });
}

bootstrap();
