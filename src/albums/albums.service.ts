import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { db } from '@/lib/db';
import { IdT } from '@/lib/types';
import { AlbumDto } from '@/albums/dto/album.dto';
import { Album } from '@/albums/albums.entity';

@Injectable()
export class AlbumsService {
  async getAll(): Promise<Album[]> {
    return db.albums;
  }

  async getOne(id: IdT): Promise<Album> {
    return db.albums.find((entry) => entry.id === id);
  }

  async create({ name, year, artistId }: AlbumDto): Promise<Album> {
    const album = {
      id: v4(),
      name,
      year,
      artistId,
    };

    db.albums.push(album);

    return album;
  }

  async update({ name, year, artistId }: AlbumDto, id: IdT) {
    db.albums = db.albums.map((entry) =>
      entry.id !== id ? entry : { ...entry, name, year, artistId },
    );

    return db.albums.find((entry) => entry.id === id);
  }

  async delete(id: IdT): Promise<Album> {
    const index = db.albums.findIndex((entry) => entry.id === id);

    db.tracks = db.tracks.map((entry) =>
      entry.albumId === id ? { ...entry, albumId: null } : entry,
    );

    const [entry] = db.albums.splice(index, 1);
    return entry;
  }
}
