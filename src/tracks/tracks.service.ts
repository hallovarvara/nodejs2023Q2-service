import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { IdT } from '@/lib/types';
import { TrackDto } from '@/tracks/dto/track.dto';
import { Track } from '@/tracks/tracks.entity';
import { PrismaService } from '@/lib/prisma.service';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async getOne(id: IdT): Promise<Track> {
    return await this.prisma.track.findUnique({ where: { id } });
  }

  async create({
    name,
    duration,
    artistId,
    albumId,
  }: TrackDto): Promise<Track> {
    const data = {
      id: v4(),
      name,
      duration,
      artistId,
      albumId,
    };

    await this.prisma.track.create({ data });

    return data;
  }

  async update({ name, duration, artistId, albumId }: TrackDto, id: IdT) {
    return await this.prisma.track.update({
      where: { id },
      data: { name, duration, artistId, albumId },
    });
  }

  async delete(id: IdT): Promise<Track> {
    const entry = await this.getOne(id);
    await this.prisma.track.delete({ where: { id } });
    return entry;
  }
}
