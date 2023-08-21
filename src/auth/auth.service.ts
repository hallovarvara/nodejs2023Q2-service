import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { arePasswordsMatch } from '@/users/utils/encrypt-password';
import { JWT } from '@/auth/auth.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup({ login, password }: CreateUserDto) {
    const existingUser = await this.usersService.getOneByLogin(login);

    if (existingUser.login === login) {
      throw new HttpException(
        'Conflict. Login already exists',
        HttpStatus.CONFLICT,
      );
    }

    return await this.usersService.create({ login, password });
  }

  async login({ login, password }: CreateUserDto): Promise<JWT> {
    const user = await this.usersService.getOneByLogin(login);

    if (
      !(await arePasswordsMatch({ password, storedPassword: user.password }))
    ) {
      throw new ForbiddenException('Incorrect login or password');
    }

    return { token: 'token' };
  }
}
