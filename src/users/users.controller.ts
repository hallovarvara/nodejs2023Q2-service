import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { UsersService } from './users.service';
import { User } from '@/users/user.entity';
import { IdT } from '@/lib/types';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { RESPONSE_MESSAGES } from '@/lib/constants/response-messages';
import { UUID_VERSION } from '@/lib/constants';
import { removeUserSensitiveData } from '@/lib/utils/remove-user-sensitive-data';

@Controller('user')
@ApiBearerAuth()
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Gets all users',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    isArray: true,
    type: User,
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersService.getAll();
    return users.map(removeUserSensitiveData);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Gets single user by id',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getOne(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: IdT,
  ) {
    const user = await this.usersService.getOneById(id);
    response.status(HttpStatus.OK).send(removeUserSensitiveData(user));
  }

  @Post()
  @ApiOperation({
    summary: 'Create user',
    description: 'Creates a new user',
  })
  @ApiOkResponse({
    description: 'The user has been created',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  async create(@Body() body: CreateUserDto, @Res() response: Response) {
    const user = await this.usersService.create(body);
    response.status(HttpStatus.CREATED).send(removeUserSensitiveData(user));
  }

  @Put('/:id')
  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
  })
  @ApiOkResponse({
    description: 'The user has been updated',
    type: User,
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiForbiddenResponse({ description: 'oldPassword is wrong' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async update(
    @Body() body: UpdateUserDto,
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: IdT,
  ) {
    const user = await this.usersService.update(body, id);
    response.status(HttpStatus.OK).send(removeUserSensitiveData(user));
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes user by ID',
  })
  @ApiNoContentResponse({
    description: 'The user has been deleted',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGES.UnauthorizedError })
  @ApiNotFoundResponse({ description: 'User not found' })
  async delete(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: IdT,
  ) {
    await this.usersService.delete(id);
    response.sendStatus(HttpStatus.NO_CONTENT);
  }
}
