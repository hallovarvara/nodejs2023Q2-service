import { IdT } from '@/lib/types';

export type TrackT = {
  id: IdT; // uuid v4
  name: string;
  artistId: IdT | null; // refers to Artist
  albumId: IdT | null; // refers to Album
  duration: number; // integer number
};

export type TrackDtoT = Omit<TrackT, 'id'>;
