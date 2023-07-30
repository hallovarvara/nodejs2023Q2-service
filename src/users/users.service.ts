import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { db } from '@/lib/db';
import {
  CreateUserDtoT,
  UpdatePasswordDtoT,
  UserIdT,
  UserT,
} from './users.type';

@Injectable()
export class UsersService {
  async getAll(): Promise<UserT[]> {
    return db.users;
  }

  async getOne(userId: UserIdT): Promise<UserT> {
    return db.users.find(({ id }) => id === userId);
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

  async update({ newPassword }: UpdatePasswordDtoT, userId: UserIdT) {
    db.users = db.users.map((user) =>
      user.id !== userId
        ? user
        : {
            ...user,
            password: newPassword,
            version: ++user.version,
            updatedAt: new Date().getTime(),
          },
    );

    return db.users.find(({ id }) => id === userId);
  }

  async delete(userId: UserIdT): Promise<UserT> {
    const userIndex = db.users.findIndex(({ id }) => id === userId);
    const [user] = db.users.splice(userIndex, 1);
    return user;
  }
}
