import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import * as path from 'path';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { load } from 'js-yaml';
import { AppModule } from './app/app.module';
import { PORT_DEFAULT } from '@/lib/constants';
import { UsersModule } from '@/users/users.module';
import { ArtistsModule } from '@/artists/artists.module';
import { AlbumsModule } from '@/albums/albums.module';
import { TracksModule } from '@/tracks/tracks.module';
import { FavoritesModule } from '@/favorites/favorites.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    rawBody: true,
  });

  const apiYaml = await readFile(
    path.join(__dirname, '..', 'doc', 'api.yaml'),
    'utf-8',
  );

  const config: OpenAPIObject = load(apiYaml) as OpenAPIObject;

  const document = SwaggerModule.createDocument(app, config, {
    include: [
      UsersModule,
      ArtistsModule,
      AlbumsModule,
      TracksModule,
      FavoritesModule,
    ],
  });

  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || PORT_DEFAULT);

  console.log('API: http://localhost:4000');
  console.log('Doc: http://localhost:4000/doc');
}

bootstrap();
