import { IdT } from '@/lib/types';
import { AlbumT } from '@/albums/albums.type';
import { TrackT } from '@/tracks/tracks.type';
import { Artist } from '@/artists/artists.entity';

type FavoritesEntitiesNamesT = 'artists' | 'albums' | 'tracks';

export type FavoritesT = {
  [key in FavoritesEntitiesNamesT]: IdT[]; // favorite entities ids
};

export type FavoritesResponseT = {
  artists: Artist[];
  albums: AlbumT[];
  tracks: TrackT[];
};
