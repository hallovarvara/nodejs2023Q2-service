import { Controller, Get, HttpCode } from '@nestjs/common';
import { STATUS_CODE } from '@/lib/constants/response-status-codes';
import { UsersService } from './users.service';
import { UserT } from './users.type';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @HttpCode(STATUS_CODE.OK)
  async findAll(): Promise<UserT[]> {
    return await this.usersService.getAll();
  }
}
