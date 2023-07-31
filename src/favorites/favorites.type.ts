import { IdT } from '@/lib/types';
import { ArtistT } from '@/artists/artists.type';
import { AlbumT } from '@/albums/albums.type';
import { TrackT } from '@/tracks/tracks.type';

type FavoritesEntitiesNamesT = 'artists' | 'albums' | 'tracks';

export type FavoritesT = {
  [key in FavoritesEntitiesNamesT]: IdT[]; // favorite entities ids
};

export type FavoritesResponseT = {
  artists: ArtistT[];
  albums: AlbumT[];
  tracks: TrackT[];
};
