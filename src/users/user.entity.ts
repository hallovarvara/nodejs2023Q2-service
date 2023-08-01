import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '2d5c97a8-d1b0-4bc5-b7d5-f59ed2d50c09',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: "The user's login",
    example: 'TestUser',
    required: true,
  })
  login: string;

  @ApiHideProperty()
  password: string;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  version: number;

  @ApiProperty({
    type: 'number',
    example: 1655000000,
  })
  createdAt: string;

  @ApiProperty({
    type: 'number',
    example: 1655999999,
  })
  updatedAt: string;
}
