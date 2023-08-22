import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsUUID,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';
import { UUID_VERSION } from '@/lib/constants';

const validationOptions = { message: 'Set correct "name" and "year" fields' };

export class AlbumDto {
  @ApiProperty({
    type: 'string',
    description: "Album's name",
    example: 'Californication',
    required: true,
  })
  @IsString(validationOptions)
  @IsNotEmpty(validationOptions)
  readonly name: string;

  @ApiProperty({
    type: 'number',
    description: 'Release year',
    example: 1982,
    required: true,
  })
  @IsNumber({ allowNaN: false }, validationOptions)
  @IsNotEmpty(validationOptions)
  readonly year: number;

  @ApiProperty({
    type: 'string' || null,
    description: 'Album creator artist ID or null',
    example: '2d5c97a8-d1b0-4bc5-b7d5-f59ed2d50c09',
    required: true,
  })
  @IsUUID(UUID_VERSION, { message: '"artistId" must be a UUID or null' })
  @ValidateIf((_, id) => id !== null)
  readonly artistId: string | null;
}
