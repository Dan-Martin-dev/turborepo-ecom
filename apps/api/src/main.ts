import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global validation pipe (recommended)
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  // Enable CORS for frontend access
  app.enableCors();
  
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();