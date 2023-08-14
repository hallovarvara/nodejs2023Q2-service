import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { IdT } from '@/lib/types';
import { User } from '@/users/user.entity';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { PrismaService } from '@/lib/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getOne(id: IdT): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async create({ login, password }: CreateUserDto): Promise<User> {
    const timestampNow = new Date().getTime();

    const data = {
      login,
      password,
      id: v4(),
      createdAt: timestampNow,
      updatedAt: timestampNow,
      version: 1,
    };

    await this.prisma.user.create({ data });

    return data;
  }

  async update({ newPassword }: UpdateUserDto, id: IdT) {
    const entry = await this.getOne(id);

    return await this.prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: ++entry.version,
        updatedAt: new Date().getTime(),
      },
    });
  }

  async delete(id: IdT): Promise<User> {
    const entry = await this.getOne(id);
    await this.prisma.user.delete({ where: { id } });
    return entry;
  }
}
