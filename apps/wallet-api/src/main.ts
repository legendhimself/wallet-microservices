import { SeederService } from '@app/mongoose';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const seederModule = app.get<SeederService>(SeederService);
  seederModule.seed();
  await app.listen(3072);
}
bootstrap();
