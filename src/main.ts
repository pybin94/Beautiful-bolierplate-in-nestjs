import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as cookieParser from 'cookie-parser';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin','x-csrf-token'],
    origin: [`http://${process.env.CLIENT_DOMAIN}`, `https://${process.env.CLIENT_DOMAIN}`],
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT || 4000);
}

config();
bootstrap();