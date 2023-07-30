import { validate } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IdT } from '@/lib/types';

export const checkIdValid = (id: IdT) => {
  if (!validate(id)) {
    throw new HttpException(`ID "${id}" isn't valid`, HttpStatus.BAD_REQUEST);
  }
};
