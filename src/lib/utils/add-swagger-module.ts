import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { PORT_DEFAULT } from '@/lib/constants';
import { description, version } from 'package.json';

dotenv.config();

export const addSwaggerModule = async (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Home Library Service 3.0.0')
    .setDescription(description)
    .setVersion(version)
    .addServer(`http://localhost:${process.env.PORT || PORT_DEFAULT}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);
};
