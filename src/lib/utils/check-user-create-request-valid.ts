import { HttpException, HttpStatus, RawBodyRequest } from '@nestjs/common';
import { isFieldValid } from '@/lib/utils/is-field-valid';

export const checkUserCreateRequestValid = ({
  login,
  password,
}: RawBodyRequest<any>) => {
  if (!isFieldValid(login) || !isFieldValid(password)) {
    throw new HttpException(
      'Set "login" and "password" for a new user',
      HttpStatus.BAD_REQUEST,
    );
  }
};
