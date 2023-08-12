import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class ArtistDto {
  @ApiProperty({
    type: 'string',
    description: "Artist's full name",
    example: 'Pink',
    required: true,
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: 'boolean',
    description: 'Whether artist has got grammy or not',
    example: false,
  })
  @IsBoolean()
  readonly grammy: boolean;
}
