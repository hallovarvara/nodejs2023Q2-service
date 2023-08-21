import {
  ConsoleLogger,
  LogLevel,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { EOL } from 'node:os';
import { LogLevelEnum } from '@/logging/logging.types';
import { LOG_LEVEL, LOG_MAX_FILE_SIZE } from '@/lib/constants';
import { getCurrentDateString } from '@/logging/utils/get-current-date-string';
import { Logger } from './logger';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  private readonly level = +LOG_LEVEL;
  private readonly logger = new Logger('log', LOG_MAX_FILE_SIZE);
  private readonly errorLogger = new Logger('error', LOG_MAX_FILE_SIZE);

  log(message: unknown, context?: string): void {
    if (this.level > LogLevelEnum.log) {
      return;
    }

    this.message('log', message, context);
  }

  error(message: unknown, stack?: string, context?: string): void {
    this.message('error', message, context, stack);
  }

  warn(message: unknown, context?: string): void {
    if (this.level > LogLevelEnum.warn) {
      return;
    }

    this.message('warn', message, context);
  }

  debug(message: unknown, context?: string): void {
    if (this.level > LogLevelEnum.debug) {
      return;
    }

    this.message('debug', message, context);
  }

  verbose(message: unknown, context?: string): void {
    if (this.level > LogLevelEnum.verbose) {
      return;
    }

    this.message('verbose', message, context);
  }

  private message(
    levelName: LogLevel,
    message: unknown,
    context = 'UnknownContext',
    stack?: string,
  ): void {
    const time = getCurrentDateString();
    const level = levelName.toUpperCase();
    const stackMessage = stack ? EOL + stack : '';

    const output = `${time} | ${level} [${context}]:${EOL}${message}${stackMessage}${EOL}`;

    console.log(this.colorize(output, levelName));

    this.logger.addMessage(output);

    if (levelName === 'error') {
      this.errorLogger.addMessage(output);
    }
  }
}
