import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { IdT } from '@/lib/types';
import { TracksService } from './tracks.service';
import { Track } from '@/tracks/tracks.entity';
import { TrackDto } from '@/tracks/dto/track.dto';
import { RESPONSE_MESSAGES } from '@/lib/constants/response-messages';
import { UUID_VERSION } from '@/lib/constants';

@Controller('track')
@ApiBearerAuth()
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Access token is missing or invalid',
})
@ApiTags('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @Get()
  @ApiOperation({
    summary: 'Get tracks list',
    description: 'Gets all library tracks list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    isArray: true,
    type: Track,
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Track[]> {
    return await this.tracksService.getAll();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get single track by id',
    description: 'Gets single track by id',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  async getOne(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: IdT,
  ) {
    const track = await this.tracksService.getOne(id);
    response.status(HttpStatus.OK).send(track);
  }

  @Post()
  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track information',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  async create(@Body() body: TrackDto, @Res() response: Response) {
    const track = await this.tracksService.create(body);
    response.status(HttpStatus.CREATED).send(track);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
  })
  @ApiOkResponse({
    description: 'The track has been updated',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  async update(
    @Body() body: TrackDto,
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: IdT,
  ) {
    const track = await this.tracksService.update(body, id);
    response.status(HttpStatus.OK).send(track);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete track',
    description: 'Deletes track from library',
  })
  @ApiNoContentResponse({
    description: 'Deleted successfully',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  async delete(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: IdT,
  ) {
    await this.tracksService.delete(id);
    response.sendStatus(HttpStatus.NO_CONTENT);
  }
}
