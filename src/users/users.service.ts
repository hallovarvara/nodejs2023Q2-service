import { ForbiddenException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { IdT } from '@/lib/types';
import { User } from '@/users/user.entity';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { throwExceptionNotFound } from '@/lib/utils/throw-exception-not-found';
import { normalizeUser } from '@/lib/utils/normalize-user';
import {
  arePasswordsMatch,
  encryptPassword,
} from '@/users/utils/encrypt-password';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(normalizeUser);
  }

  async getOneById(id: IdT): Promise<User> {
    const entry = await this.prisma.user.findUnique({ where: { id } });

    if (!entry) {
      throwExceptionNotFound({ entityName: 'User', id });
    }

    return normalizeUser(entry);
  }

  async getOneByLogin(login: string): Promise<User> {
    const entry = await this.prisma.user.findFirst({ where: { login } });
    return normalizeUser(entry);
  }

  async create({ login, password }: CreateUserDto): Promise<User> {
    const date = new Date();

    const data = {
      login,
      password: await encryptPassword(password),
      id: v4(),
      createdAt: date,
      updatedAt: date,
      version: 1,
    };

    await this.prisma.user.create({ data });

    return normalizeUser(data);
  }

  async update({ newPassword, oldPassword }: UpdateUserDto, id: IdT) {
    const entry = await this.getOneById(id);

    if (
      !(await arePasswordsMatch({
        password: oldPassword,
        storedPassword: entry.password,
      }))
    ) {
      throw new ForbiddenException('Current user password is wrong');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: await encryptPassword(newPassword),
        version: ++entry.version,
        updatedAt: new Date(),
      },
    });

    return normalizeUser(updatedUser);
  }

  async delete(id: IdT) {
    await this.getOneById(id);
    await this.prisma.user.delete({ where: { id } });
  }
}
