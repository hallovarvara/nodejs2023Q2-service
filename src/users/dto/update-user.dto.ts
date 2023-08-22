import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

const validationOptions = {
  message: 'Set correct "newPassword" and "oldPassword" for updating user',
};

export class UpdateUserDto {
  @ApiProperty({
    type: 'string',
    description: "The user's old password",
    required: true,
    example: 'OldPassword',
  })
  @IsString(validationOptions)
  @IsNotEmpty(validationOptions)
  readonly oldPassword: string;

  @ApiProperty({
    type: 'string',
    description: "The user's new password",
    required: true,
    example: 'NewPassword',
  })
  @IsString(validationOptions)
  @IsNotEmpty(validationOptions)
  readonly newPassword: string;
}
