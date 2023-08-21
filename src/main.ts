import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { PORT } from '@/lib/constants';
import { showError } from '@/lib/utils/show-error';
import { addSwaggerModule } from '@/lib/utils/add-swagger-module';
import { LoggingService } from '@/logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    rawBody: true,
  });

  const logger = app.get(LoggingService);

  app.useLogger(logger);
  // app.useGlobalFilters(new GlobalExceptionFilter());

  await addSwaggerModule(app);

  process.on('unhandledRejection', (error) =>
    showError({ error, errorName: 'Unhandled Rejection', logger }),
  );

  process.on('uncaughtException', (error) =>
    showError({ error, errorName: 'Uncaught Exception', logger }),
  );

  await app.listen(PORT, () => {
    console.log(`API: http://localhost:${PORT}`);
    console.log(`Doc: http://localhost:${PORT}/doc`);
  });
}

bootstrap();
