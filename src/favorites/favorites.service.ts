import { Injectable } from '@nestjs/common';
import { db } from '@/lib/db';
import { FavoritesResponseT } from './favorites.type';
import { IdT } from '@/lib/types';

@Injectable()
export class FavoritesService {
  async getAll(): Promise<FavoritesResponseT> {
    const favs = Object.entries(db.favorites).reduce(
      (result, [key, indices]) => ({
        ...result,
        [key]: indices.reduce((entries, id) => {
          const entry = db[key].find((entry) => entry.id === id);
          return entry ? [...entries, entry] : entries;
        }, []),
      }),
      {} as FavoritesResponseT,
    );

    return favs;
  }

  async addTrack(id: IdT): Promise<FavoritesResponseT> {
    db.favorites.tracks.push(id);
    return this.getAll();
  }

  async checkFavoriteTrackId(id: IdT): Promise<boolean> {
    return db.favorites.tracks.includes(id);
  }

  async deleteTrack(id: IdT): Promise<FavoritesResponseT> {
    const index = db.favorites.tracks.findIndex((entry) => entry === id);
    db.favorites.tracks.splice(index, 1);
    return this.getAll();
  }

  async addAlbum(id: IdT): Promise<FavoritesResponseT> {
    db.favorites.albums.push(id);
    return this.getAll();
  }

  async checkFavoriteAlbumId(id: IdT): Promise<boolean> {
    return db.favorites.albums.includes(id);
  }

  async deleteAlbum(id: IdT): Promise<FavoritesResponseT> {
    const index = db.favorites.albums.findIndex((entry) => entry === id);
    db.favorites.albums.splice(index, 1);
    return this.getAll();
  }

  async addArtist(id: IdT): Promise<FavoritesResponseT> {
    db.favorites.artists.push(id);
    return this.getAll();
  }

  async checkFavoriteArtistId(id: IdT): Promise<boolean> {
    return db.favorites.artists.includes(id);
  }

  async deleteArtist(id: IdT): Promise<FavoritesResponseT> {
    const index = db.favorites.artists.findIndex((entry) => entry === id);
    db.favorites.artists.splice(index, 1);
    return this.getAll();
  }
}
