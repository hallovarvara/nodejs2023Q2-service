import { UserT } from '@/users/users.type';
import { ArtistT } from '@/artists/artists.type';

export const db: {
  artists: ArtistT[];
  users: UserT[];
} = {
  artists: [],
  users: [],
};
