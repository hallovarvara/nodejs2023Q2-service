import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { IdT } from '@/lib/types';
import { FavoritesService } from './favorites.service';
import { FavoritesResponseT } from './favorites.type';
import { throwNotFavoriteException } from '@/favorites/utils/throw-not-favorite-exception';
import { checkIdValid } from '@/lib/utils/check-id-valid';
import { checkTrackExistsById } from '@/lib/utils/check-track-exists-by-id';
import { checkAlbumExistsById } from '@/lib/utils/check-album-exists-by-id';
import { checkArtistExistsById } from '@/lib/utils/check-artist-exists-by-id';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<FavoritesResponseT> {
    return await this.favoritesService.getAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: IdT, @Res() response: Response) {
    checkIdValid(id);
    checkTrackExistsById(id, HttpStatus.UNPROCESSABLE_ENTITY);
    const favorites = await this.favoritesService.addTrack(id);
    response.status(HttpStatus.CREATED).send(favorites);
  }

  @Delete('track/:id')
  async deleteTrack(@Param('id') id: IdT, @Res() response: Response) {
    checkIdValid(id);

    if (!(await this.favoritesService.checkFavoriteTrackId(id))) {
      throwNotFavoriteException({ id, entityName: 'Track' });
    }

    const favorites = await this.favoritesService.deleteTrack(id);
    response.status(HttpStatus.NO_CONTENT).send(favorites);
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: IdT, @Res() response: Response) {
    checkIdValid(id);
    checkAlbumExistsById(id, HttpStatus.UNPROCESSABLE_ENTITY);
    const favorites = await this.favoritesService.addAlbum(id);
    response.status(HttpStatus.CREATED).send(favorites);
  }

  @Delete('album/:id')
  async deleteAlbum(@Param('id') id: IdT, @Res() response: Response) {
    checkIdValid(id);

    if (!(await this.favoritesService.checkFavoriteAlbumId(id))) {
      throwNotFavoriteException({ id, entityName: 'Album' });
    }

    const favorites = await this.favoritesService.deleteAlbum(id);
    response.status(HttpStatus.NO_CONTENT).send(favorites);
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: IdT, @Res() response: Response) {
    checkIdValid(id);
    checkArtistExistsById(id, HttpStatus.UNPROCESSABLE_ENTITY);
    const favorites = await this.favoritesService.addArtist(id);
    response.status(HttpStatus.CREATED).send(favorites);
  }

  @Delete('artist/:id')
  async deleteArtist(@Param('id') id: IdT, @Res() response: Response) {
    checkIdValid(id);

    if (!(await this.favoritesService.checkFavoriteArtistId(id))) {
      throwNotFavoriteException({ id, entityName: 'Artist' });
    }

    const favorites = await this.favoritesService.deleteArtist(id);
    response.status(HttpStatus.NO_CONTENT).send(favorites);
  }
}
