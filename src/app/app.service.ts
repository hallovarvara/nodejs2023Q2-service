import { Injectable } from '@nestjs/common';
import { name } from 'package.json';

@Injectable()
export class AppService {
  getHello(): string {
    return `Server for app "${name}" is running`;
  }
}
