import { HttpException, HttpStatus, RawBodyRequest } from '@nestjs/common';
import { isFieldValidString } from '@/lib/utils/is-field-valid-string';
import { isFieldValidNumber } from '@/lib/utils/is-field-valid-number';

export const checkTrackRequestValid = ({
  name,
  duration,
}: RawBodyRequest<any>) => {
  if (!isFieldValidString(name) || !isFieldValidNumber(duration)) {
    throw new HttpException(
      'Set correct "name" and "duration" fields',
      HttpStatus.BAD_REQUEST,
    );
  }
};
