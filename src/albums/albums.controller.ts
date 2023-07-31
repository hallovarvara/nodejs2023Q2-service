import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  RawBodyRequest,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { IdT } from '@/lib/types';
import { AlbumsService } from './albums.service';
import { AlbumT } from './albums.type';
import { checkIdValid } from '@/lib/utils/check-id-valid';
import { checkAlbumExistsById } from '../lib/utils/check-album-exists-by-id';
import { checkAlbumRequestValid } from './utils/check-album-request-valid';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<AlbumT[]> {
    return await this.albumsService.getAll();
  }

  @Get('/:id')
  async getOne(@Res() response: Response, @Param('id') id: IdT) {
    checkIdValid(id);
    checkAlbumExistsById(id);
    const artist = await this.albumsService.getOne(id);
    response.status(HttpStatus.OK).send(artist);
  }

  @Post()
  async create(
    @Req() { body }: RawBodyRequest<any>,
    @Res() response: Response,
  ) {
    checkAlbumRequestValid(body);
    const artist = await this.albumsService.create(body);
    response.status(HttpStatus.CREATED).send(artist);
  }

  @Put('/:id')
  async update(
    @Req() { body }: RawBodyRequest<any>,
    @Res() response: Response,
    @Param('id') id: IdT,
  ) {
    checkAlbumRequestValid(body);
    checkIdValid(id);
    checkAlbumExistsById(id);
    const artist = await this.albumsService.update(body, id);
    response.status(HttpStatus.OK).send(artist);
  }

  @Delete('/:id')
  async delete(@Res() response: Response, @Param('id') id: IdT) {
    checkIdValid(id);
    checkAlbumExistsById(id);
    const artist = await this.albumsService.delete(id);
    response.status(HttpStatus.NO_CONTENT).send(artist);
  }
}
