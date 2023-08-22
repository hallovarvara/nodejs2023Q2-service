import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

const validationOptions = { message: 'Set correct "name" and "grammy" fields' };

export class ArtistDto {
  @ApiProperty({
    type: 'string',
    description: "Artist's full name",
    example: 'Pink',
    required: true,
  })
  @IsString(validationOptions)
  @IsNotEmpty(validationOptions)
  readonly name: string;

  @ApiProperty({
    type: 'boolean',
    description: 'Whether artist has got grammy or not',
    example: false,
  })
  @IsBoolean(validationOptions)
  @IsNotEmpty(validationOptions)
  readonly grammy: boolean;
}
