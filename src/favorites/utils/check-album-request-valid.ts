import { HttpException, HttpStatus, RawBodyRequest } from '@nestjs/common';
import { isFieldValidString } from '@/lib/utils/is-field-valid-string';
import { isFieldValidNumber } from '@/lib/utils/is-field-valid-number';

export const checkAlbumRequestValid = ({ name, year }: RawBodyRequest<any>) => {
  if (!isFieldValidString(name) || !isFieldValidNumber(year)) {
    throw new HttpException(
      'Set correct "name" and "year" fields',
      HttpStatus.BAD_REQUEST,
    );
  }
};
