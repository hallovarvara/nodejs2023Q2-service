import { HttpException, HttpStatus } from '@nestjs/common';
import { db } from '@/lib/db';
import { UserIdT } from '../users.type';

export const checkUserExists = (userId: UserIdT) => {
  if (!db.users.some((user) => user.id === userId)) {
    throw new HttpException(
      `User with ID "${userId}" doesn't exist`,
      HttpStatus.NOT_FOUND,
    );
  }
};
