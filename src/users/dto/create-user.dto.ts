import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

const validationOptions = {
  message: 'Set correct "login" and "password" for a new user',
};

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    example: 'TestLogin',
  })
  @IsString(validationOptions)
  @IsNotEmpty(validationOptions)
  readonly login: string;

  @ApiProperty({
    type: 'string',
    example: 'TestPassword',
  })
  @IsString(validationOptions)
  @IsNotEmpty(validationOptions)
  readonly password: string;
}
