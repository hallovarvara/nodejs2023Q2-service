import { HttpException, HttpStatus, RawBodyRequest } from '@nestjs/common';
import { isFieldValidString } from '@/lib/utils/is-field-valid-string';

export const checkUserCreateRequestValid = ({
  login,
  password,
}: RawBodyRequest<any>) => {
  if (!isFieldValidString(login) || !isFieldValidString(password)) {
    throw new HttpException(
      'Set correct "login" and "password" for a new user',
      HttpStatus.BAD_REQUEST,
    );
  }
};
