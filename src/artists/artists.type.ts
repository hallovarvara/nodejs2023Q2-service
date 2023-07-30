import { IdT } from '@/lib/types';

export type ArtistT = {
  id: IdT; // uuid v4
  name: string;
  grammy: boolean;
};

export type ArtistDtoT = Omit<ArtistT, 'id'>;
