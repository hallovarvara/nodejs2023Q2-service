import { IdT } from '@/lib/types';

export type AlbumT = {
  id: IdT; // uuid v4
  name: string;
  year: number;
  artistId: IdT | null; // refers to Artist
};

export type AlbumDtoT = Omit<AlbumT, 'id'>;
