import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    // options: {
    //   urls: ['amqp://user:password@ip:port/smartranking'],
    //   noAck: false,
    //   queue: 'admin-backend'
    // }
  });
  logger.log('Microservice is listening')
  await app.listen();
  // () => logger.log('Microservice is listening')
}
bootstrap();
