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
import { AlbumsService } from './albums.service';
import { checkIdValid } from '@/lib/utils/check-id-valid';
import { checkAlbumExistsById } from '@/lib/utils/check-album-exists-by-id';
import { checkAlbumRequestValid } from './utils/check-album-request-valid';
import { Album } from '@/albums/albums.entity';
import { RESPONSE_MESSAGES } from '@/lib/constants/response-messages';
import { AlbumDto } from '@/albums/dto/album.dto';

@Controller('album')
@ApiTags('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Get()
  @ApiOperation({
    summary: 'Get albums list',
    description: 'Gets all library albums list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    isArray: true,
    type: Album,
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Album[]> {
    return await this.albumsService.getAll();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Gets single album by id',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  async getOne(@Res() response: Response, @Param('id') id: IdT) {
    checkIdValid(id);
    checkAlbumExistsById(id);
    const artist = await this.albumsService.getOne(id);
    response.status(HttpStatus.OK).send(artist);
  }

  @Post()
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiOkResponse({
    description: 'Album is created',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  async create(@Body() body: AlbumDto, @Res() response: Response) {
    checkAlbumRequestValid(body);
    const artist = await this.albumsService.create(body);
    response.status(HttpStatus.CREATED).send(artist);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiOkResponse({
    description: 'The album has been updated',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  async update(
    @Body() body: AlbumDto,
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
  @ApiOperation({
    summary: 'Delete album',
    description: 'Deletes album from library',
  })
  @ApiNoContentResponse({
    description: 'Deleted successfully',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  async delete(@Res() response: Response, @Param('id') id: IdT) {
    checkIdValid(id);
    checkAlbumExistsById(id);
    const artist = await this.albumsService.delete(id);
    response.status(HttpStatus.NO_CONTENT).send(artist);
  }
}
