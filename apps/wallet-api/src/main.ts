import { SeederService } from '@app/mongoose';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

const logger = new Logger();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const seederModule = app.get<SeederService>(SeederService);
  seederModule.seed();

  const config = new DocumentBuilder()
    .setTitle('Wallet Api')
    .setDescription('Wallet api for assignment')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  logger.log('Application is listening on port 3000');
}
bootstrap();
