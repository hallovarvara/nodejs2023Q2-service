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
import { UserIdT, UserResponseT } from './users.type';
import { checkUserCreateRequestValid } from './utils/check-user-create-request-valid';
import { checkUserIdValid } from './utils/check-user-id-valid';
import { checkUserExists } from './utils/check-user-exists';
import { getUserResponse } from './utils/get-user-response';
import { checkUserUpdateRequestValid } from './utils/check-user-update-request-valid';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<UserResponseT[]> {
    const users = await this.usersService.getAll();
    return users.map(getUserResponse);
  }

  @Get('/:userId')
  async getOne(@Res() response: Response, @Param('userId') userId: UserIdT) {
    checkUserIdValid(userId);
    checkUserExists(userId);
    const user = await this.usersService.getOne(userId);
    response.status(HttpStatus.OK).send(getUserResponse(user));
  }

  @Post()
  async create(
    @Req() { body }: RawBodyRequest<any>,
    @Res() response: Response,
  ) {
    checkUserCreateRequestValid(body);

    // if (isUserExisting(login)) {
    //   throw new HttpException(
    //     `User with login "${login}" already exists`,
    //     HttpStatus.CONFLICT,
    //   );
    // }

    const user = await this.usersService.create(body);
    response.status(HttpStatus.CREATED).send(getUserResponse(user));
  }

  @Put('/:userId')
  async update(
    @Req() { body }: RawBodyRequest<any>,
    @Res() response: Response,
    @Param('userId') userId: UserIdT,
  ) {
    checkUserUpdateRequestValid(body);
    checkUserIdValid(userId);
    checkUserExists(userId);

    const user = await this.usersService.getOne(userId);

    if (user.password !== body.oldPassword) {
      throw new HttpException(
        `Current user password is wrong`,
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedUser = await this.usersService.update(body, userId);
    response.status(HttpStatus.OK).send(getUserResponse(updatedUser));
  }

  @Delete('/:userId')
  async delete(@Res() response: Response, @Param('userId') userId: UserIdT) {
    checkUserIdValid(userId);
    checkUserExists(userId);
    const user = await this.usersService.delete(userId);
    response.status(HttpStatus.NO_CONTENT).send(getUserResponse(user));
  }
}
