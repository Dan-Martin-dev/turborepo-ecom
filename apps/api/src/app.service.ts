import { Injectable } from '@nestjs/common';
import { HELLO_WORLD } from 'shared/utils/constants';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello from the API! Here's a shared constant: ${HELLO_WORLD}`;
  }
}
