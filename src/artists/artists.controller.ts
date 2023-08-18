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
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { IdT } from '@/lib/types';
import { ArtistsService } from './artists.service';
import { ArtistDto } from '@/artists/dto/artist.dto';
import { checkArtistRequestValid } from '@/artists/utils/check-artist-request-valid';
import { Artist } from '@/artists/artists.entity';
import { RESPONSE_MESSAGES } from '@/lib/constants/response-messages';
import { UUID_VERSION } from '@/lib/constants';

@Controller('artist')
@ApiTags('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Get()
  @ApiOperation({
    summary: 'Get all artists',
    description: 'Gets all artists',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    isArray: true,
    type: Artist,
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Artist[]> {
    return await this.artistsService.getAll();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Get single artist by id',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  async getOne(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: IdT,
  ) {
    const artist = await this.artistsService.getOne(id);
    response.status(HttpStatus.OK).send(artist);
  }

  @Post()
  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  async create(@Body() body: ArtistDto, @Res() response: Response) {
    checkArtistRequestValid(body);
    const artist = await this.artistsService.create(body);
    response.status(HttpStatus.CREATED).send(artist);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update artist information by UUID',
  })
  @ApiOkResponse({
    description: 'The artist has been updated',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  async update(
    @Body() body: ArtistDto,
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: IdT,
  ) {
    checkArtistRequestValid(body);
    const artist = await this.artistsService.update(body, id);
    response.status(HttpStatus.OK).send(artist);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete artist',
    description: 'Deletes artist from library',
  })
  @ApiNoContentResponse({
    description: 'Deleted successfully',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  async delete(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: IdT,
  ) {
    await this.artistsService.delete(id);
    response.sendStatus(HttpStatus.NO_CONTENT);
  }
}
