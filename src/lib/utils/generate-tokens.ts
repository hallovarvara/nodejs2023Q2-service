import { JwtService } from '@nestjs/jwt';
import { IdT } from '@/lib/types';
import {
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
  TOKEN_REFRESH_EXPIRE_TIME,
} from '@/lib/constants';

const tokenRefreshOptions = {
  secret: JWT_SECRET_REFRESH_KEY,
  expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
};

export const generateTokens = async ({
  id: userId,
  login,
  jwtService,
}: {
  id: IdT;
  login: string;
  jwtService: JwtService;
}) => ({
  accessToken: await jwtService.signAsync(
    { userId, login },
    { secret: JWT_SECRET_KEY },
  ),
  refreshToken: await jwtService.signAsync(
    { userId, login },
    tokenRefreshOptions,
  ),
});

export const regenerateTokens = async ({
  jwtService,
  refreshToken,
}: {
  jwtService: JwtService;
  refreshToken: string;
}) => await jwtService.verifyAsync(refreshToken, tokenRefreshOptions);
