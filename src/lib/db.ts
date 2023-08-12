import { Artist } from '@/artists/artists.entity';
import { User } from '@/users/user.entity';
import { AlbumT } from '@/albums/albums.type';
import { TrackT } from '@/tracks/tracks.type';
import { FavoritesT } from '@/favorites/favorites.type';

export const db: {
  albums: AlbumT[];
  artists: Artist[];
  favorites: FavoritesT;
  tracks: TrackT[];
  users: User[];
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
