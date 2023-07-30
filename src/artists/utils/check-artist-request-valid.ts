import { HttpException, HttpStatus, RawBodyRequest } from '@nestjs/common';
import { isFieldValidString } from '@/lib/utils/is-field-valid-string';
import { isFieldValidBoolean } from '@/lib/utils/is-field-valid-boolean';

export const checkArtistRequestValid = ({
  name,
  grammy,
}: RawBodyRequest<any>) => {
  if (!isFieldValidString(name) || !isFieldValidBoolean(grammy)) {
    throw new HttpException(
      'Set correct "name" and "grammy" fields',
      HttpStatus.BAD_REQUEST,
    );
  }
};
