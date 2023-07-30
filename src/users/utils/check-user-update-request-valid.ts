import { HttpException, HttpStatus, RawBodyRequest } from '@nestjs/common';
import { isFieldValidString } from '@/lib/utils/is-field-valid-string';

export const checkUserUpdateRequestValid = ({
  newPassword,
  oldPassword,
}: RawBodyRequest<any>) => {
  if (!isFieldValidString(newPassword) || !isFieldValidString(oldPassword)) {
    throw new HttpException(
      'Set correct "newPassword" and "oldPassword" for updating user',
      HttpStatus.BAD_REQUEST,
    );
  }
};
