import { HttpException, HttpStatus } from '@nestjs/common';
import { IdT } from '@/lib/types';

export const throwNotFavoriteException = ({
  id,
  entityName,
}: {
  id: IdT;
  entityName: string;
}) => {
  throw new HttpException(
    `${entityName} with ID "${id} is not in Favorites"`,
    HttpStatus.NOT_FOUND,
  );
};
