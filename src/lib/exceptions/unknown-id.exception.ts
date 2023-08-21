import { IdT } from '@/lib/types';

export class UnknownIdException extends Error {
  constructor(entityName: string, id: IdT) {
    super(`${entityName} with id "${id}" doesn't exist`);
    this.name = 'UnknownIdException';
  }
}
