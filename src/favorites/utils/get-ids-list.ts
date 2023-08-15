import { IdT } from '@/lib/types';

export const getIdsList = (arr: Array<{ id: IdT }> | null) =>
  Array.isArray(arr) && arr.length > 0 ? arr.map(({ id }) => id) : [];
