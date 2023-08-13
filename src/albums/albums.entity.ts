import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '2d5c97a8-d1b0-4bc5-b7d5-f59ed2d50c09',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Californication',
    required: true,
  })
  name: string;

  @ApiProperty({
    type: 'number',
    example: 1982,
    required: true,
  })
  year: number;

  @ApiProperty({
    type: 'string' || null,
    example: '2d5c97a8-d1b0-4bc5-b7d5-f59ed2d50c09',
    required: true,
  })
  artistId: string | null;
}
