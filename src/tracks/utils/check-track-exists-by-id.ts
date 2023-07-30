import { db } from '@/lib/db';
import { IdT } from '@/lib/types';
import { checkEntryExistsById } from '@/lib/utils/check-entry-exists-by-id';

export const checkTrackExistsById = (id: IdT) =>
  checkEntryExistsById({ id, db: db.tracks, entityName: 'Track' });
