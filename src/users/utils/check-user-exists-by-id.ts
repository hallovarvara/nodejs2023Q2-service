import { IdT } from '@/lib/types';
import { db } from '@/lib/db';
import { checkEntryExistsById } from '@/lib/utils/check-entry-exists-by-id';

export const checkUserExistsById = (id: IdT) =>
  checkEntryExistsById({ id, db: db.users, entityName: 'User' });
