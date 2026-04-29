import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path'
import "reflect-metadata";
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: true, 
    credentials: true
  });
  app.useStaticAssets(join(process.cwd(), 'passportFiles'), {
    prefix: '/passportFiles'
  })
  app.use(
    session.default({
      secret: 'my-secret', 
      resave: false, 
      saveUninitialized: false
    })
  )
  await app.listen(process.env.BACKEND_PORT ?? 3000);
}
bootstrap();
