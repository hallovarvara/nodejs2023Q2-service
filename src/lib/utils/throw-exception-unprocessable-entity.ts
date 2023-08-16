import { HttpException, HttpStatus } from '@nestjs/common';
import { IdT } from '@/lib/types';

export const throwExceptionUnprocessableEntity = ({
  entityName,
  id,
}: {
  entityName: string;
  id: IdT;
}) => {
  throw new HttpException(
    `${entityName} with ID "${id}" doesn't exist`,
    HttpStatus.UNPROCESSABLE_ENTITY,
  );
};
