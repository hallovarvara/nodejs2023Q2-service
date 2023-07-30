import { UserIdT } from '@/users/users.type';
import { isUserExistingById } from '@/lib/utils/is-user-existing';
import { HttpException, HttpStatus } from '@nestjs/common';

export const checkUserExists = (userId: UserIdT) => {
  if (!isUserExistingById(userId)) {
    throw new HttpException(
      `User with ID "${userId}" doesn't exist`,
      HttpStatus.NOT_FOUND,
    );
  }
};
