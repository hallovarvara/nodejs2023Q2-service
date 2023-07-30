import { IdT } from '@/lib/types';
import { HttpException, HttpStatus } from '@nestjs/common';

type CheckEntryFuncPropsT<T> = {
  entityName: string;
  db: T[];
  id: IdT;
};
export const checkEntryExistsById = <T extends { id: IdT }>({
  db,
  id,
  entityName,
}: CheckEntryFuncPropsT<T>) => {
  if (!db.some((entry) => entry.id === id)) {
    throw new HttpException(
      `${entityName} with ID "${id}" doesn't exist`,
      HttpStatus.NOT_FOUND,
    );
  }
};
