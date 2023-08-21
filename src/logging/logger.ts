import * as path from 'node:path';
import { rename, appendFile, stat } from 'node:fs/promises';
import { getCurrentDatePath } from '@/logging/utils/get-current-date-path';
import { LOG_DIRECTORY } from '@/lib/constants';

export class Logger {
  private readonly logDirectory = path.join(process.cwd(), LOG_DIRECTORY);
  private readonly logFilename: string;
  private readonly messages: string[] = [];
  private readonly prefix = 'last';
  private isClearing = false;

  constructor(
    private readonly logName: string,
    private readonly maxLogSize: number,
  ) {
    this.logFilename = `${this.prefix}-${this.logName}.log`;
    setInterval(() => this.clearMessages(), 1000);
  }

  addMessage(message: string): void {
    this.messages.push(message);
  }

  private async logMessage(message: string): Promise<void> {
    try {
      const filePath = path.join(this.logDirectory, this.logFilename);
      const logSize = await this.getLogFileSize(filePath);

      if (logSize + message.length >= this.maxLogSize) {
        await rename(
          filePath,
          path.join(
            this.logDirectory,
            this.logFilename.replace(
              new RegExp(this.prefix),
              getCurrentDatePath(),
            ),
          ),
        );
      }

      await appendFile(filePath, message);
    } catch {}
  }

  private async clearMessages(): Promise<void> {
    if (this.isClearing) {
      return;
    }

    this.isClearing = true;

    while (this.messages.length > 0) {
      await this.logMessage(this.messages.shift());
    }

    this.isClearing = false;
  }

  private async getLogFileSize(filePath: string): Promise<number> {
    try {
      return (await stat(filePath)).size;
    } catch {
      return 0;
    }
  }
}
