import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { PORT } from '@/lib/constants';
import { addSwaggerModule } from '@/lib/utils/add-swagger-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    rawBody: true,
  });

  await addSwaggerModule(app);

  await app.listen(PORT, () => {
    console.log(`API: http://localhost:${PORT}`);
    console.log(`Doc: http://localhost:${PORT}/doc`);
  });
}

bootstrap();
