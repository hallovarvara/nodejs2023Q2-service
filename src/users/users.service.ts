import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { db } from '@/lib/db';
import { CreateUserDtoT, UpdatePasswordDtoT, UserT } from './users.type';
import { IdT } from '@/lib/types';

@Injectable()
export class UsersService {
  async getAll(): Promise<UserT[]> {
    return db.users;
  }

  async getOne(id: IdT): Promise<UserT> {
    return db.users.find((entry) => entry.id === id);
  }

  async create({ login, password }: CreateUserDtoT): Promise<UserT> {
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

  async update({ newPassword }: UpdatePasswordDtoT, id: IdT) {
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

    return db.users.find(({ id }) => id === id);
  }

  async delete(id: IdT): Promise<UserT> {
    const index = db.users.findIndex((entry) => entry.id === id);
    const [entry] = db.users.splice(index, 1);
    return entry;
  }
}
