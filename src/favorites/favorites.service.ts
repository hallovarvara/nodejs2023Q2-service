import { Injectable } from '@nestjs/common';
import { IdT } from '@/lib/types';
import { Favorites } from '@/favorites/favorites.entity';
import { PrismaService } from '@/prisma/prisma.service';
import { getIdsList } from '@/favorites/utils/get-ids-list';
import { getFavoritesArray } from '@/favorites/utils/get-favorites-array';
import { throwExceptionUnprocessableEntity } from '@/lib/utils/throw-exception-unprocessable-entity';
import { throwExceptionNotFound } from '@/lib/utils/throw-exception-not-found';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Favorites> {
    const tracksIds = await this.prisma.favoriteTracks.findMany();
    const tracks = await this.prisma.track.findMany({
      where: { id: { in: getIdsList(tracksIds) } },
    });

    const albumsIds = await this.prisma.favoriteAlbums.findMany();
    const albums = await this.prisma.album.findMany({
      where: { id: { in: getIdsList(albumsIds) } },
    });

    const artistsIds = await this.prisma.favoriteArtists.findMany();
    const artists = await this.prisma.artist.findMany({
      where: { id: { in: getIdsList(artistsIds) } },
    });

    return {
      tracks: getFavoritesArray(tracks).map(
        ({ id, name, duration, artistId, albumId }) => ({
          id,
          name,
          duration,
          artistId,
          albumId,
        }),
      ),
      albums: getFavoritesArray(albums).map(({ id, name, year, artistId }) => ({
        id,
        name,
        year,
        artistId,
      })),
      artists: getFavoritesArray(artists).map(({ id, name, grammy }) => ({
        id,
        name,
        grammy,
      })),
    };
  }

  async addTrack(id: IdT): Promise<Favorites> {
    const entry = await this.prisma.track.findUnique({ where: { id } });

    if (!entry) {
      throwExceptionUnprocessableEntity({ entityName: 'Track', id });
    }

    await this.prisma.favoriteTracks.create({ data: { id } });

    return this.getAll();
  }

  async deleteTrack(id: IdT): Promise<Favorites> {
    const entry = await this.prisma.favoriteTracks.findUnique({
      where: { id },
    });

    if (!entry) {
      throwExceptionNotFound({ entityName: 'Favorite Track', id });
    }

    await this.prisma.favoriteTracks.delete({ where: { id } });
    return this.getAll();
  }

  async addAlbum(id: IdT): Promise<Favorites> {
    const entry = await this.prisma.album.findUnique({ where: { id } });

    if (!entry) {
      throwExceptionUnprocessableEntity({ entityName: 'Album', id });
    }

    await this.prisma.favoriteAlbums.create({ data: { id } });

    return this.getAll();
  }

  async deleteAlbum(id: IdT): Promise<Favorites> {
    const entry = await this.prisma.favoriteAlbums.findUnique({
      where: { id },
    });

    if (!entry) {
      throwExceptionNotFound({ entityName: 'Favorite Album', id });
    }

    await this.prisma.favoriteAlbums.delete({ where: { id } });
    return this.getAll();
  }

  async addArtist(id: IdT): Promise<Favorites> {
    const entry = await this.prisma.artist.findUnique({ where: { id } });

    if (!entry) {
      throwExceptionUnprocessableEntity({ entityName: 'Artist', id });
    }

    await this.prisma.favoriteArtists.create({ data: { id } });

    return this.getAll();
  }

  async deleteArtist(id: IdT): Promise<Favorites> {
    const entry = await this.prisma.favoriteArtists.findUnique({
      where: { id },
    });

    if (!entry) {
      throwExceptionNotFound({ entityName: 'Favorite Artist', id });
    }

    await this.prisma.favoriteArtists.delete({ where: { id } });
    return this.getAll();
  }
}
