import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices'
import { Logger } from '@nestjs/common';

const logger = new Logger('Main')

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    // options: {
    //   urls: ['amqp://user:q7W2UQk249gR@18.210.17.173:5672/smartranking'],
    //   noAck: false,
    //   queue: 'admin-backend'
    // },
  });

  logger.log('Microservice is listening')
  await app.listen();
}
bootstrap();
