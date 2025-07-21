import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  
  const port = process.env.BACKEND_PORT || 3001;
  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}`);
}
bootstrap();
