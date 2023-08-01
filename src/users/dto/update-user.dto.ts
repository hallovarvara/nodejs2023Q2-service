import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: 'string',
    description: "The user's old password",
    required: true,
    example: 'OldPassword',
  })
  @IsString()
  readonly oldPassword: string;

  @ApiProperty({
    type: 'string',
    description: "The user's new password",
    required: true,
    example: 'NewPassword',
  })
  @IsString()
  readonly newPassword: string;
}
