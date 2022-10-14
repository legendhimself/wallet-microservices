import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { SeederService } from './mongoose/seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const seederModule = app.get<SeederService>(SeederService);
  seederModule.seed();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000 },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
