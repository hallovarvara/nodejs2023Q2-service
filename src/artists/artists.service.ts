import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { db } from '@/lib/db';
import { ArtistDto } from '@/artists/dto/artist.dto';
import { IdT } from '@/lib/types';
import { Artist } from '@/artists/artists.entity';

@Injectable()
export class ArtistsService {
  async getAll(): Promise<Artist[]> {
    return db.artists;
  }

  async getOne(id: IdT): Promise<Artist> {
    return db.artists.find((entry) => entry.id === id);
  }

  async create({ name, grammy }: ArtistDto): Promise<Artist> {
    const artist = {
      id: v4(),
      name,
      grammy,
    };

    db.artists.push(artist);

    return artist;
  }

  async update({ name, grammy }: ArtistDto, id: IdT) {
    db.artists = db.artists.map((entry) =>
      entry.id !== id ? entry : { ...entry, name, grammy },
    );

    return db.artists.find((entry) => entry.id === id);
  }

  async delete(id: IdT): Promise<Artist> {
    const index = db.artists.findIndex((entry) => entry.id === id);

    db.albums = db.albums.map((entry) =>
      entry.artistId === id ? { ...entry, artistId: null } : entry,
    );

    db.tracks = db.tracks.map((entry) =>
      entry.artistId === id ? { ...entry, artistId: null } : entry,
    );

    const [entry] = db.artists.splice(index, 1);
    return entry;
  }
}
