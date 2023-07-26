import { Injectable } from '@nestjs/common';
import { db } from '@/lib/db';
import { UserT } from '@/users/users.type';

@Injectable()
export class UsersService {
  async getAll(): Promise<UserT[]> {
    return db.users;
  }
}
