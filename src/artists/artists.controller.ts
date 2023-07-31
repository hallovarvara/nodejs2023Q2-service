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
import { ArtistsService } from './artists.service';
import { ArtistT } from './artists.type';
import { checkIdValid } from '@/lib/utils/check-id-valid';
import { checkArtistExistsById } from '@/lib/utils/check-artist-exists-by-id';
import { checkArtistRequestValid } from '@/artists/utils/check-artist-request-valid';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ArtistT[]> {
    return await this.artistsService.getAll();
  }

  @Get('/:id')
  async getOne(@Res() response: Response, @Param('id') id: IdT) {
    checkIdValid(id);
    checkArtistExistsById(id);
    const artist = await this.artistsService.getOne(id);
    response.status(HttpStatus.OK).send(artist);
  }

  @Post()
  async create(
    @Req() { body }: RawBodyRequest<any>,
    @Res() response: Response,
  ) {
    checkArtistRequestValid(body);
    const artist = await this.artistsService.create(body);
    response.status(HttpStatus.CREATED).send(artist);
  }

  @Put('/:id')
  async update(
    @Req() { body }: RawBodyRequest<any>,
    @Res() response: Response,
    @Param('id') id: IdT,
  ) {
    checkArtistRequestValid(body);
    checkIdValid(id);
    checkArtistExistsById(id);
    const artist = await this.artistsService.update(body, id);
    response.status(HttpStatus.OK).send(artist);
  }

  @Delete('/:id')
  async delete(@Res() response: Response, @Param('id') id: IdT) {
    checkIdValid(id);
    checkArtistExistsById(id);
    const artist = await this.artistsService.delete(id);
    response.status(HttpStatus.NO_CONTENT).send(artist);
  }
}
