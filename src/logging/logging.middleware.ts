import { Injectable, Logger, NestMiddleware, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { EOL } from 'node:os';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { statusCode } = response;
      const { method, url } = request;
      const requestMethod = `${method.toUpperCase()} method`;
      const requestUrl = `Url: ${url}`;
      const queryParams = `Query params: ${JSON.stringify(request.query)}`;
      const requestBody = `Request Body: ${JSON.stringify(request.body)}`;
      const responseStatus = `${statusCode} status code`;

      const message = `${EOL}REQUEST${EOL}${requestMethod}${EOL}${requestUrl}${EOL}${queryParams}${EOL}${requestBody}${EOL}${EOL}RESPONSE${EOL}${responseStatus}`;

      if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(message);
        return;
      }

      if (statusCode >= HttpStatus.BAD_REQUEST) {
        this.logger.log(message);
        return;
      }

      this.logger.debug(message);
    });

    next();
  }
}
