import { HttpException, HttpStatus } from '@nestjs/common';
import { IdT } from '@/lib/types';

export const throwExceptionNotFound = ({
  entityName,
  id,
}: {
  entityName: string;
  id: IdT;
}) => {
  throw new HttpException(
    `${entityName} with ID "${id}" doesn't exist`,
    HttpStatus.NOT_FOUND,
  );
};
