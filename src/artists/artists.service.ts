import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { ArtistDto } from '@/artists/dto/artist.dto';
import { IdT } from '@/lib/types';
import { Artist } from '@/artists/artists.entity';
import { PrismaService } from '@/prisma/prisma.service';
import { throwExceptionNotFound } from '@/lib/utils/throw-exception-not-found';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async getOne(id: IdT): Promise<Artist> {
    const entry = await this.prisma.artist.findUnique({ where: { id } });

    if (!entry) {
      throwExceptionNotFound({ entityName: 'Artist', id });
    }

    return entry;
  }

  async create({ name, grammy }: ArtistDto): Promise<Artist> {
    const data = { id: v4(), name, grammy };
    await this.prisma.artist.create({ data });
    return data;
  }

  async update({ name, grammy }: ArtistDto, id: IdT) {
    await this.getOne(id);

    return await this.prisma.artist.update({
      where: { id },
      data: { name, grammy },
    });
  }

  async delete(id: IdT) {
    await this.getOne(id);
    await this.prisma.artist.delete({ where: { id } });
  }
}
