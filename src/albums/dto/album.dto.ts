import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, ValidateIf } from 'class-validator';

export class AlbumDto {
  @ApiProperty({
    type: 'string',
    description: "Album's name",
    example: 'Californication',
    required: true,
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: 'number',
    description: 'Release year',
    example: 1982,
    required: true,
  })
  @IsNumber()
  readonly year: number;

  @ApiProperty({
    type: 'string' || null,
    description: 'Album creator artist ID or null',
    example: '2d5c97a8-d1b0-4bc5-b7d5-f59ed2d50c09',
    required: true,
  })
  @IsUUID(4, { message: '"artistId" must be a UUID or null' })
  @ValidateIf((_, id) => id !== null)
  readonly artistId: string | null;
}
