import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path'
import "reflect-metadata";
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api')
  app.enableCors();
  app.useStaticAssets(join(process.cwd(), 'passportFiles'), {
    prefix: '/passportFiles'
  })
  await app.listen(process.env.BACKEND_PORT ?? 3000);
}
bootstrap();
