import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  RawBodyRequest,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserResponseT } from './users.type';
import { checkIdValid } from '@/lib/utils/check-id-valid';
import { checkUserCreateRequestValid } from './utils/check-user-create-request-valid';
import { checkUserExistsById } from './utils/check-user-exists-by-id';
import { getUserResponse } from './utils/get-user-response';
import { checkUserUpdateRequestValid } from './utils/check-user-update-request-valid';
import { IdT } from '@/lib/types';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<UserResponseT[]> {
    const users = await this.usersService.getAll();
    return users.map(getUserResponse);
  }

  @Get('/:id')
  async getOne(@Res() response: Response, @Param('id') id: IdT) {
    checkIdValid(id);
    checkUserExistsById(id);
    const user = await this.usersService.getOne(id);
    response.status(HttpStatus.OK).send(getUserResponse(user));
  }

  @Post()
  async create(
    @Req() { body }: RawBodyRequest<any>,
    @Res() response: Response,
  ) {
    checkUserCreateRequestValid(body);
    const user = await this.usersService.create(body);
    response.status(HttpStatus.CREATED).send(getUserResponse(user));
  }

  @Put('/:id')
  async update(
    @Req() { body }: RawBodyRequest<any>,
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
  async delete(@Res() response: Response, @Param('id') id: IdT) {
    checkIdValid(id);
    checkUserExistsById(id);
    const user = await this.usersService.delete(id);
    response.status(HttpStatus.NO_CONTENT).send(getUserResponse(user));
  }
}
