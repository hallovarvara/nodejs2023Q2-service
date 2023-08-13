import { Artist } from '@/artists/artists.entity';
import { Album } from '@/albums/albums.entity';
import { Track } from '@/tracks/tracks.entity';

export enum FavoritesEntitiesEnum {
  Artists = 'artists',
  Tracks = 'albums',
  Albums = 'tracks',
}

export type FavoritesResponseT = {
  [FavoritesEntitiesEnum.Artists]: Artist[];
  [FavoritesEntitiesEnum.Albums]: Album[];
  [FavoritesEntitiesEnum.Tracks]: Track[];
};
