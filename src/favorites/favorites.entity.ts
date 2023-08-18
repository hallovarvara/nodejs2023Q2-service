import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Artist } from '@/artists/artists.entity';
import { Album } from '@/albums/albums.entity';
import { Track } from '@/tracks/tracks.entity';

export class Favorites {
  @ApiProperty({
    description: 'Favorite artists list',
    example: [
      {
        id: '2d5c97a8-d1b0-4bc5-b7d5-f59ed2d50c09',
        name: 'Freddie Mercury',
        grammy: true,
      },
      {
        id: '2d5c97a8-d1b0-5ab6-b7d5-f59ed2d50c09',
        name: 'Red Hot Chili Peppers',
        grammy: true,
      },
    ],
  })
  @IsArray()
  artists: Artist[];

  @ApiProperty({
    description: 'Favorite albums list',
    example: [
      {
        id: '2d5c97a8-d1b0-4bc5-b7d5-f59ed2d50c09',
        name: 'Californication',
        year: 1982,
      },
      {
        id: '2d5c97a8-d1b0-5ab6-b7d5-f59ed2d50c09',
        name: 'Mr. Bad Guy',
        year: 1985,
      },
    ],
  })
  @IsArray()
  albums: Album[];

  @ApiProperty({
    description: 'Favorite tracks list',
    example: [
      {
        id: '2d5c97a8-d1b0-4bc5-b7d5-f59ed2d50c09',
        name: 'Slowly Deeply',
        duration: 262,
        artistId: '3e6c97a8-d1b0-5ab6-b7d5-f59ed2d50c09',
        albumId: '4f7c97a8-d1b0-5ab6-b7d5-f59ed2d50c09',
      },
      {
        id: '5a9c97a8-d1b0-4bc5-b7d5-f59ed2d50c09',
        name: 'My Love Is Dangerous',
        duration: 223,
        artistId: '6b0d97a8-d1b0-4bc5-b7d5-f59ed2d50c09',
        albumId: '7c1e08b9-d1b0-4bc5-b7d5-f59ed2d50c09',
      },
    ],
  })
  @IsArray()
  tracks: Track[];
}
