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
import { TracksService } from './tracks.service';
import { TrackT } from './tracks.type';
import { checkIdValid } from '@/lib/utils/check-id-valid';
import { checkTrackExistsById } from '../lib/utils/check-track-exists-by-id';
import { checkTrackRequestValid } from './utils/check-track-request-valid';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<TrackT[]> {
    return await this.tracksService.getAll();
  }

  @Get('/:id')
  async getOne(@Res() response: Response, @Param('id') id: IdT) {
    checkIdValid(id);
    checkTrackExistsById(id);
    const track = await this.tracksService.getOne(id);
    response.status(HttpStatus.OK).send(track);
  }

  @Post()
  async create(
    @Req() { body }: RawBodyRequest<any>,
    @Res() response: Response,
  ) {
    checkTrackRequestValid(body);
    const track = await this.tracksService.create(body);
    response.status(HttpStatus.CREATED).send(track);
  }

  @Put('/:id')
  async update(
    @Req() { body }: RawBodyRequest<any>,
    @Res() response: Response,
    @Param('id') id: IdT,
  ) {
    checkTrackRequestValid(body);
    checkIdValid(id);
    checkTrackExistsById(id);
    const track = await this.tracksService.update(body, id);
    response.status(HttpStatus.OK).send(track);
  }

  @Delete('/:id')
  async delete(@Res() response: Response, @Param('id') id: IdT) {
    checkIdValid(id);
    checkTrackExistsById(id);
    const track = await this.tracksService.delete(id);
    response.status(HttpStatus.NO_CONTENT).send(track);
  }
}
