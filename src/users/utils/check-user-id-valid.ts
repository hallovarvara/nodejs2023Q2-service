import { validate } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserIdT } from '../users.type';

export const checkUserIdValid = (userId: UserIdT) => {
  if (!validate(userId)) {
    throw new HttpException(
      `User ID "${userId}" isn't valid`,
      HttpStatus.BAD_REQUEST,
    );
  }
};
