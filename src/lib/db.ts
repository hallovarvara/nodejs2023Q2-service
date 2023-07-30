import { UserT } from '@/users/users.type';
import { ArtistT } from '@/artists/artists.type';
import { AlbumT } from '@/albums/albums.type';

export const db: {
  albums: AlbumT[];
  artists: ArtistT[];
  users: UserT[];
} = {
  albums: [],
  artists: [],
  users: [],
};
