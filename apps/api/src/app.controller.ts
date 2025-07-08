import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { prisma } from 'database';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  async getUsers() {
    // This is just an example, it will return an empty array
    // until you seed the database.
    try {
      return await prisma.user.findMany();
    } catch (e) {
      return { error: 'Database query failed.', details: e.message }
    }
  }
}
