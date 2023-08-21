import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY, JWT_SECRET_KEY } from '@/lib/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const { url, body, headers } = request;

    if (url.startsWith('/auth/refresh')) {
      const { refreshToken } = body;

      if (!refreshToken) {
        throw new UnauthorizedException('No "refreshToken" in body');
      }

      return true;
    } else {
      const [type, baseToken] = headers.authorization?.split(' ') ?? [];
      const token = type === 'Bearer' ? baseToken : undefined;

      if (!token) {
        throw new UnauthorizedException('User is unauthorised');
      }

      try {
        request['user'] = await this.jwtService.verifyAsync(token, {
          secret: JWT_SECRET_KEY,
        });

        return true;
      } catch {
        throw new UnauthorizedException('User is unauthorised');
      }
    }
  }
}
