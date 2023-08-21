import { LoggingService } from '@/logging/logging.service';

export const showError = ({
  error,
  errorName,
  logger,
}: {
  error: unknown;
  errorName: string;
  logger: LoggingService;
}) => {
  logger.error(
    `${errorName}: ${
      error instanceof Error ? error.message : JSON.stringify(error)
    }`,
  );
};
