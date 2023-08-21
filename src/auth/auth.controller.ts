import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@/users/user.entity';
import { Response } from 'express';
import { AuthService } from '@/auth/auth.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { JWT } from '@/auth/auth.entity';
import { RefreshTokenDto } from '@/auth/dto/refresh-token.dto';
import { Public } from '@/lib/decorators/public.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @ApiOperation({ summary: 'Signup', description: 'Signup a user' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'The user is successfully created',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'User with this login already exists' })
  async signup(@Body() body: CreateUserDto, @Res() response: Response) {
    const user = await this.authService.signup(body);
    response.status(HttpStatus.CREATED).send(user);
  }

  @Post('login')
  @Public()
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
    const tokens = await this.authService.login(body);
    response.status(HttpStatus.OK).send(tokens);
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh tokens',
    description: 'Returns a fresh JWT-token',
  })
  @ApiOkResponse({
    description: 'Successful JWT-token refreshing',
    type: JWT,
  })
  @ApiForbiddenResponse({ description: 'Refresh token is invalid or expired' })
  async refresh(@Body() body: RefreshTokenDto, @Res() response: Response) {
    const newTokens = await this.authService.refresh(body);
    response.status(HttpStatus.OK).send(newTokens);
  }
}
