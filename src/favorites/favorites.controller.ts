import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { IdT } from '@/lib/types';
import { FavoritesService } from './favorites.service';
import { throwNotFavoriteException } from '@/favorites/utils/throw-not-favorite-exception';
import { checkTrackExistsById } from '@/lib/utils/check-track-exists-by-id';
import { checkAlbumExistsById } from '@/lib/utils/check-album-exists-by-id';
import { checkArtistExistsById } from '@/lib/utils/check-artist-exists-by-id';
import { RESPONSE_MESSAGES } from '@/lib/constants/response-messages';
import { Favorites } from '@/favorites/favorites.entity';
import { Track } from '@/tracks/tracks.entity';
import { Album } from '@/albums/albums.entity';
import { UUID_VERSION } from '@/lib/constants';

@Controller('favs')
@ApiTags('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites movies, tracks and books',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Favorites,
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Favorites> {
    return await this.favoritesService.getAll();
  }

  @Post('track/:id')
  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiCreatedResponse({
    description: 'Added successfully',
    type: Favorites,
  })
  @ApiBadRequestResponse({ description: 'Bad. trackId is invalid (not uuid)' })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiUnprocessableEntityResponse({
    description: "Track with id doesn't exist",
  })
  async addTrack(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: IdT,
  ) {
    checkTrackExistsById(id, HttpStatus.UNPROCESSABLE_ENTITY);
    const favorites = await this.favoritesService.addTrack(id);
    response.status(HttpStatus.CREATED).send(favorites);
  }

  @Delete('track/:id')
  @ApiOperation({
    summary: 'Deletes track from favorites',
    description: 'Deletes track from favorites',
  })
  @ApiNoContentResponse({
    description: 'Deleted successfully',
    type: Track,
  })
  @ApiBadRequestResponse({ description: 'Bad. trackId is invalid (not uuid)' })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  async deleteTrack(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: IdT,
  ) {
    if (!(await this.favoritesService.checkFavoriteTrackId(id))) {
      throwNotFavoriteException({ id, entityName: 'Track' });
    }

    const favorites = await this.favoritesService.deleteTrack(id);
    response.status(HttpStatus.NO_CONTENT).send(favorites);
  }

  @Post('album/:id')
  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiCreatedResponse({
    description: 'Added successfully',
    type: Favorites,
  })
  @ApiBadRequestResponse({ description: 'Bad. albumId is invalid (not uuid)' })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiUnprocessableEntityResponse({
    description: "Album with id doesn't exist",
  })
  async addAlbum(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: IdT,
  ) {
    checkAlbumExistsById(id, HttpStatus.UNPROCESSABLE_ENTITY);
    const favorites = await this.favoritesService.addAlbum(id);
    response.status(HttpStatus.CREATED).send(favorites);
  }

  @Delete('album/:id')
  @ApiOperation({
    summary: 'Deletes album from favorites',
    description: 'Deletes album from favorites',
  })
  @ApiNoContentResponse({
    description: 'Deleted successfully',
    type: Album,
  })
  @ApiBadRequestResponse({ description: 'Bad. albumId is invalid (not uuid)' })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  async deleteAlbum(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: IdT,
  ) {
    if (!(await this.favoritesService.checkFavoriteAlbumId(id))) {
      throwNotFavoriteException({ id, entityName: 'Album' });
    }

    const favorites = await this.favoritesService.deleteAlbum(id);
    response.status(HttpStatus.NO_CONTENT).send(favorites);
  }

  @Post('artist/:id')
  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiCreatedResponse({
    description: 'Added successfully',
    type: Favorites,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiUnprocessableEntityResponse({
    description: "Artist with id doesn't exist",
  })
  async addArtist(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: IdT,
  ) {
    checkArtistExistsById(id, HttpStatus.UNPROCESSABLE_ENTITY);
    const favorites = await this.favoritesService.addArtist(id);
    response.status(HttpStatus.CREATED).send(favorites);
  }

  @Delete('artist/:id')
  @ApiOperation({
    summary: 'Deletes artist from favorites',
    description: 'Deletes artist from favorites',
  })
  @ApiNoContentResponse({
    description: 'Deleted successfully',
    type: Track,
  })
  @ApiBadRequestResponse({ description: 'Bad. artistId is invalid (not uuid)' })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  async deleteArtist(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: IdT,
  ) {
    if (!(await this.favoritesService.checkFavoriteArtistId(id))) {
      throwNotFavoriteException({ id, entityName: 'Artist' });
    }

    const favorites = await this.favoritesService.deleteArtist(id);
    response.status(HttpStatus.NO_CONTENT).send(favorites);
  }
}
