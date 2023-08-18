import { HttpException } from '@nestjs/common';
import { IdT } from '@/lib/types';
import { HttpStatus } from '@nestjs/common';

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
