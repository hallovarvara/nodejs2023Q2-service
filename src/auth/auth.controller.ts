import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from '@/auth/auth.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { JWT } from '@/auth/auth.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Signup', description: 'Signup a user' })
  @ApiNoContentResponse({ description: 'Successful signup' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict. Login already exists' })
  async signup(@Body() body: CreateUserDto, @Res() response: Response) {
    await this.authService.signup(body);
    response.sendStatus(HttpStatus.NO_CONTENT);
  }

  @Post()
  @ApiOperation({
    summary: 'Login',
    description: 'Logins a user and returns a JWT-token',
  })
  @ApiOkResponse({
    description: 'Successful login',
    type: JWT,
  })
  @ApiForbiddenResponse({ description: 'Incorrect login or password' })
  async login(@Body() body: CreateUserDto, @Res() response: Response) {
    const jwt = await this.authService.login(body);
    response.status(HttpStatus.NO_CONTENT).send(jwt);
  }
}
