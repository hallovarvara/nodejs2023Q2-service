import { db } from '@/lib/db';
import { IdT } from '@/lib/types';
import { checkEntryExistsById } from '@/lib/utils/check-entry-exists-by-id';

export const checkArtistExistsById = (id: IdT) =>
  checkEntryExistsById({ id, db: db.artists, entityName: 'Artist' });
