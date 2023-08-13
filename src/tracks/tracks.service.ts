import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { db } from '@/lib/db';
import { IdT } from '@/lib/types';
import { TrackDto } from '@/tracks/dto/track.dto';
import { Track } from '@/tracks/tracks.entity';

@Injectable()
export class TracksService {
  async getAll(): Promise<Track[]> {
    return db.tracks;
  }

  async getOne(id: IdT): Promise<Track> {
    return db.tracks.find((entry) => entry.id === id);
  }

  async create({
    name,
    duration,
    artistId,
    albumId,
  }: TrackDto): Promise<Track> {
    const track = {
      id: v4(),
      name,
      duration,
      artistId,
      albumId,
    };

    db.tracks.push(track);

    return track;
  }

  async update({ name, duration, artistId, albumId }: TrackDto, id: IdT) {
    db.tracks = db.tracks.map((entry) =>
      entry.id !== id ? entry : { ...entry, name, duration, artistId, albumId },
    );

    return db.tracks.find((entry) => entry.id === id);
  }

  async delete(id: IdT): Promise<Track> {
    const index = db.tracks.findIndex((entry) => entry.id === id);
    const [entry] = db.tracks.splice(index, 1);
    return entry;
  }
}
