import { Injectable } from '@nestjs/common';
import { getNewUser } from '@/lib/utils/get-new-user';
import { db } from '@/lib/db';
import {
  CreateUserDtoT,
  UpdatePasswordDtoT,
  UserIdT,
  UserT,
} from '@/users/users.type';

@Injectable()
export class UsersService {
  async getAll(): Promise<UserT[]> {
    return db.users;
  }

  async getOne(userId: UserIdT): Promise<UserT> {
    return db.users.find(({ id }) => id === userId);
  }

  async create(data: CreateUserDtoT): Promise<UserT> {
    const user = getNewUser(data);
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
