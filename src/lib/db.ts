import { Artist } from '@/artists/artists.entity';
import { User } from '@/users/user.entity';
import { FavoritesEntitiesEnum } from '@/favorites/favorites.type';
import { Album } from '@/albums/albums.entity';
import { Track } from '@/tracks/tracks.entity';
import { IdT } from '@/lib/types';

export const db: {
  albums: Album[];
  artists: Artist[];
  favorites: {
    [key in FavoritesEntitiesEnum]: IdT[]; // favorite entities ids
  };
  tracks: Track[];
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
