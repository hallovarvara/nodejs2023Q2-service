import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { JWT } from '@/auth/auth.entity';
import { RefreshTokenDto } from '@/auth/dto/refresh-token.dto';
import { arePasswordsMatch } from '@/users/utils/encrypt-password';
import { generateTokens, regenerateTokens } from '@/lib/utils/generate-tokens';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup({ login, password }: CreateUserDto) {
    const existingUser = await this.usersService.getOneByLogin(login);

    if (existingUser?.login === login) {
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
      !user ||
      !(await arePasswordsMatch({ password, storedPassword: user?.password }))
    ) {
      throw new ForbiddenException('Incorrect login or password');
    }

    const { id } = user;
    return await generateTokens({ id, login, jwtService: this.jwtService });
  }

  async refresh({ refreshToken }: RefreshTokenDto) {
    const { id, login } = await regenerateTokens({
      jwtService: this.jwtService,
      refreshToken,
    });

    if (!id || !login) {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }

    return await generateTokens({ id, login, jwtService: this.jwtService });
  }
}
