import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { User } from '@/users/user.entity';
import { IdT } from '@/lib/types';
import { UsersService } from './users.service';
import { checkIdValid } from '@/lib/utils/check-id-valid';
import { checkUserCreateRequestValid } from './utils/check-user-create-request-valid';
import { checkUserExistsById } from './utils/check-user-exists-by-id';
import { getUserResponse } from './utils/get-user-response';
import { checkUserUpdateRequestValid } from './utils/check-user-update-request-valid';
import { RESPONSE_MESSAGES } from '@/lib/constants/response-messages';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';

@Controller('user')
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
    return users.map(getUserResponse);
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
  async getOne(@Res() response: Response, @Param('id') id: IdT) {
    checkIdValid(id);
    checkUserExistsById(id);
    const user = await this.usersService.getOne(id);
    response.status(HttpStatus.OK).send(getUserResponse(user));
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
    checkUserCreateRequestValid(body);
    const user = await this.usersService.create(body);
    response.status(HttpStatus.CREATED).send(getUserResponse(user));
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
    @Param('id') id: IdT,
  ) {
    checkUserUpdateRequestValid(body);
    checkIdValid(id);
    checkUserExistsById(id);

    const user = await this.usersService.getOne(id);

    if (user.password !== body.oldPassword) {
      throw new HttpException(
        `Current user password is wrong`,
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedUser = await this.usersService.update(body, id);
    response.status(HttpStatus.OK).send(getUserResponse(updatedUser));
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
  async delete(@Res() response: Response, @Param('id') id: IdT) {
    checkIdValid(id);
    checkUserExistsById(id);
    const user = await this.usersService.delete(id);
    response.status(HttpStatus.NO_CONTENT).send(getUserResponse(user));
  }
}
