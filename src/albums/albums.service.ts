import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { IdT } from '@/lib/types';
import { AlbumDto } from '@/albums/dto/album.dto';
import { Album } from '@/albums/albums.entity';
import { PrismaService } from '@/prisma/prisma.service';
import { throwExceptionNotFound } from '@/lib/utils/throw-exception-not-found';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async getOne(id: IdT): Promise<Album> {
    const entry = await this.prisma.album.findUnique({ where: { id } });

    if (!entry) {
      throwExceptionNotFound({ entityName: 'Album', id });
    }

    return entry;
  }

  async create({ name, year, artistId }: AlbumDto): Promise<Album> {
    const data = { id: v4(), name, year, artistId };
    await this.prisma.album.create({ data });
    return data;
  }

  async update({ name, year, artistId }: AlbumDto, id: IdT) {
    await this.getOne(id);

    return await this.prisma.album.update({
      where: { id },
      data: { name, year, artistId },
    });
  }

  async delete(id: IdT) {
    await this.getOne(id);
    await this.prisma.album.delete({ where: { id } });
  }
}
