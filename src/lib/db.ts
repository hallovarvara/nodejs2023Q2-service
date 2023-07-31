import { UserT } from '@/users/users.type';
import { ArtistT } from '@/artists/artists.type';
import { AlbumT } from '@/albums/albums.type';
import { TrackT } from '@/tracks/tracks.type';
import { FavoritesT } from '@/favorites/favorites.type';

export const db: {
  albums: AlbumT[];
  artists: ArtistT[];
  favorites: FavoritesT;
  tracks: TrackT[];
  users: UserT[];
} = {
  albums: [],
  artists: [],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
  tracks: [],
  users: [],
};
