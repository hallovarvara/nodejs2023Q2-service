import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpExceptionBody,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { EOL } from 'node:os';
import { UnknownIdException } from '@/lib/exceptions/unknown-id.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    let body: HttpExceptionBody;
    let statusCode: HttpStatus;

    if (exception instanceof UnknownIdException) {
      statusCode = HttpStatus.BAD_REQUEST;

      body = {
        error: exception.name,
        message: exception.message,
        statusCode,
      };
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse !== 'string') {
        body = exceptionResponse as HttpExceptionBody;
        body.error = exception.name;
      } else {
        body = {
          error: exception.name,
          message: exceptionResponse,
          statusCode,
        };
      }
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      body = {
        error: exception.name,
        message: exception.message,
        statusCode,
      };
    }

    const exceptionName = `Exception: "${body.error}"`;
    const status = `Status code: ${body.statusCode}`;
    const errorMessage = `Message: ${body.message}`;

    const message = `${EOL}${exceptionName}${EOL}${status}${EOL}${errorMessage}`;

    if (body.statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(message);
      return;
    }

    if (body.statusCode >= HttpStatus.BAD_REQUEST) {
      this.logger.log(message);
      return;
    }

    this.logger.debug(message);

    const response = host.switchToHttp().getResponse<Response>();
    response.status(statusCode).json(body);
  }
}
