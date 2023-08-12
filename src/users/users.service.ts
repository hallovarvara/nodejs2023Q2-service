import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { db } from '@/lib/db';
import { IdT } from '@/lib/types';
import { User } from '@/users/user.entity';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';

@Injectable()
export class UsersService {
  async getAll(): Promise<User[]> {
    return db.users;
  }

  async getOne(id: IdT): Promise<User> {
    return db.users.find((entry) => entry.id === id);
  }

  async create({ login, password }: CreateUserDto): Promise<User> {
    const timestampNow = new Date().getTime();

    const user = {
      login,
      password,
      id: v4(),
      createdAt: timestampNow,
      updatedAt: timestampNow,
      version: 1,
    };

    db.users.push(user);
    return user;
  }

  async update({ newPassword }: UpdateUserDto, id: IdT) {
    db.users = db.users.map((user) =>
      user.id !== id
        ? user
        : {
            ...user,
            password: newPassword,
            version: ++user.version,
            updatedAt: new Date().getTime(),
          },
    );

    return db.users.find((user) => user.id === id);
  }

  async delete(id: IdT): Promise<User> {
    const index = db.users.findIndex((entry) => entry.id === id);
    const [entry] = db.users.splice(index, 1);
    return entry;
  }
}
