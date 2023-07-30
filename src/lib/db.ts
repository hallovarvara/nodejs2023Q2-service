import { UserT } from '@/users/users.type';
import { ArtistT } from '@/artists/artists.type';
import { AlbumT } from '@/albums/albums.type';
import { TrackT } from '@/tracks/tracks.type';

export const db: {
  albums: AlbumT[];
  artists: ArtistT[];
  tracks: TrackT[];
  users: UserT[];
} = {
  albums: [],
  artists: [],
  tracks: [],
  users: [],
};
