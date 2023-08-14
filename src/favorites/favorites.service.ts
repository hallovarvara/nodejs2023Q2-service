import { Injectable } from '@nestjs/common';
import { db } from '@/lib/db';
import { IdT } from '@/lib/types';
import { Favorites } from '@/favorites/favorites.entity';

@Injectable()
export class FavoritesService {
  async getAll(): Promise<Favorites> {
    return Object.entries(db.favorites).reduce(
      (result, [key, indices]) => ({
        ...result,
        [key]: indices.reduce((entries, id) => {
          const entry = db[key].find((entry) => entry.id === id);
          return entry ? [...entries, entry] : entries;
        }, []),
      }),
      {} as Favorites,
    );
  }

  async addTrack(id: IdT): Promise<Favorites> {
    db.favorites.tracks.push(id);
    return this.getAll();
  }

  async checkFavoriteTrackId(id: IdT): Promise<boolean> {
    return db.favorites.tracks.includes(id);
  }

  async deleteTrack(id: IdT): Promise<Favorites> {
    const index = db.favorites.tracks.findIndex((entry) => entry === id);
    db.favorites.tracks.splice(index, 1);
    return this.getAll();
  }

  async addAlbum(id: IdT): Promise<Favorites> {
    db.favorites.albums.push(id);
    return this.getAll();
  }

  async checkFavoriteAlbumId(id: IdT): Promise<boolean> {
    return db.favorites.albums.includes(id);
  }

  async deleteAlbum(id: IdT): Promise<Favorites> {
    const index = db.favorites.albums.findIndex((entry) => entry === id);
    db.favorites.albums.splice(index, 1);
    return this.getAll();
  }

  async addArtist(id: IdT): Promise<Favorites> {
    db.favorites.artists.push(id);
    return this.getAll();
  }

  async checkFavoriteArtistId(id: IdT): Promise<boolean> {
    return db.favorites.artists.includes(id);
  }

  async deleteArtist(id: IdT): Promise<Favorites> {
    const index = db.favorites.artists.findIndex((entry) => entry === id);
    db.favorites.artists.splice(index, 1);
    return this.getAll();
  }
}
