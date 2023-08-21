import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PORT } from '@/lib/constants';
import { description, version } from 'package.json';

export const addSwaggerModule = async (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Home Library Service 3.0.0')
    .setDescription(description)
    .setVersion(version)
    .addServer(`http://localhost:${PORT}`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);
};
