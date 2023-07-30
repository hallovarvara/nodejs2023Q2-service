import { HttpException, HttpStatus, RawBodyRequest } from '@nestjs/common';
import { isFieldValid } from '@/lib/utils/is-field-valid';

export const checkUserUpdateRequestValid = ({
  newPassword,
  oldPassword,
}: RawBodyRequest<any>) => {
  if (!isFieldValid(newPassword) || !isFieldValid(oldPassword)) {
    throw new HttpException(
      'Set "newPassword" and "oldPassword" for updating user',
      HttpStatus.BAD_REQUEST,
    );
  }
};
