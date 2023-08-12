import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '2d5c97a8-d1b0-4bc5-b7d5-f59ed2d50c09',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Freddie Mercury',
    required: true,
  })
  name: string;

  @ApiProperty({
    type: 'boolean',
    example: false,
  })
  grammy: boolean;
}
