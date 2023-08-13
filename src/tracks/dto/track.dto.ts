import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, ValidateIf } from 'class-validator';

export class TrackDto {
  @ApiProperty({
    type: 'string',
    description: "Track's name",
    example: 'Slowly Deeply',
    required: true,
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: 'number',
    description: 'Track duration in seconds',
    example: 262,
    required: true,
  })
  @IsNumber()
  readonly duration: number;

  @ApiProperty({
    type: 'string' || null,
    description: 'Album creator artist ID or null',
    example: '2d5c97a8-d1b0-4bc5-b7d5-f59ed2d50c09',
    required: true,
  })
  @IsUUID(4, { message: '"artistId" must be a UUID or null' })
  @ValidateIf((_, id) => id !== null)
  readonly artistId: string | null;

  @ApiProperty({
    type: 'string' || null,
    description: 'Album ID or null',
    example: '2d5c97a8-d1b0-4bc5-b7d5-f59ed2d50c09',
    required: true,
  })
  @IsUUID(4, { message: '"albumId" must be a UUID or null' })
  @ValidateIf((_, id) => id !== null)
  readonly albumId: string | null;
}
