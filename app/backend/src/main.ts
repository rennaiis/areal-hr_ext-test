import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path'
import "reflect-metadata";
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session'
import { UserService } from './user/user.service';
import { makeAdmin } from './seeds';
import passport from 'passport';
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
  app.use(passport.initialize())
  app.use(passport.session())
  
  const userService = app.get(UserService)
  await makeAdmin(userService)
  await app.listen(process.env.BACKEND_PORT ?? 3000);
}
bootstrap();
