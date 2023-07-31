import { db } from '@/lib/db';
import { IdT } from '@/lib/types';
import { checkEntryExistsById } from '@/lib/utils/check-entry-exists-by-id';
import { HttpStatus } from '@nestjs/common';

export const checkAlbumExistsById = (id: IdT, statusCode?: HttpStatus) =>
  checkEntryExistsById({ id, db: db.albums, entityName: 'Album', statusCode });
