import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { db } from '@/lib/db';
import { ArtistT, ArtistDtoT } from './artists.type';
import { IdT } from '@/lib/types';

@Injectable()
export class ArtistsService {
  async getAll(): Promise<ArtistT[]> {
    return db.artists;
  }

  async getOne(id: IdT): Promise<ArtistT> {
    return db.artists.find((entry) => entry.id === id);
  }

  async create({ name, grammy }: ArtistDtoT): Promise<ArtistT> {
    const artist = {
      id: v4(),
      name,
      grammy,
    };

    db.artists.push(artist);

    return artist;
  }

  async update({ name, grammy }: ArtistDtoT, id: IdT) {
    db.artists = db.artists.map((entry) =>
      entry.id !== id ? entry : { ...entry, name, grammy },
    );

    return db.artists.find((entry) => entry.id === id);
  }

  async delete(id: IdT): Promise<ArtistT> {
    const index = db.artists.findIndex((entry) => entry.id === id);

    db.albums = db.albums.map((album) =>
      album.artistId === id ? { ...album, artistId: null } : album,
    );

    const [entry] = db.artists.splice(index, 1);
    return entry;
  }
}
