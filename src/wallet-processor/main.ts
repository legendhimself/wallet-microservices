import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProcessorModule } from './processor.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProcessorModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
