import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { db } from '@/lib/db';
import { AlbumT, AlbumDtoT } from './albums.type';
import { IdT } from '@/lib/types';

@Injectable()
export class AlbumsService {
  async getAll(): Promise<AlbumT[]> {
    return db.albums;
  }

  async getOne(id: IdT): Promise<AlbumT> {
    return db.albums.find((entry) => entry.id === id);
  }

  async create({ name, year, artistId }: AlbumDtoT): Promise<AlbumT> {
    const album = {
      id: v4(),
      name,
      year,
      artistId,
    };

    db.albums.push(album);

    return album;
  }

  async update({ name, year, artistId }: AlbumDtoT, id: IdT) {
    db.albums = db.albums.map((entry) =>
      entry.id !== id ? entry : { ...entry, name, year, artistId },
    );

    return db.albums.find((entry) => entry.id === id);
  }

  async delete(id: IdT): Promise<AlbumT> {
    const index = db.albums.findIndex((entry) => entry.id === id);

    db.tracks = db.tracks.map((entry) =>
      entry.albumId === id ? { ...entry, albumId: null } : entry,
    );

    const [entry] = db.albums.splice(index, 1);
    return entry;
  }
}
