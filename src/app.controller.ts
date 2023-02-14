import { Controller, Get, Logger, Query } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { channel } from 'diagnostics_channel';
import { AppService } from './app.service';
import { Categoria } from './interfaces/categorias/categoria.interface';

const ackErrors: string[] = ['E11000'];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  logger = new Logger(AppController.name);

  @EventPattern('criar-categoria')
  async criarCategoria(
    @Payload() categoria: Categoria, @Ctx() context: RmqContext) {

    // const channel = context.getChannelRef();
    // const originalMsg = context.getMessage();

    this.logger.log(`categoria: ${categoria}`);

    try {
      await this.appService.criarCategoria(categoria);
      // await channel.ack(originalMsg); // delete stopped messages in the queue
    } catch (err) {
      this.logger.error(`error: ${err.message}`);
      // const filterAckError = ackErrors.filter(
      //   ackError => err.message.includes(ackError))

      // if(filterAckError) {
      //   await channel.ack(originalMsg);
      // }
    }

  }

  @MessagePattern('consultar-categorias')
  async consultarCategorias(@Payload() _id: string) {
    if (_id) {
      return await this.appService.consultarCategoriaPeloId(_id);
    } else {
      return await this.appService.consultarTodasCategorias();
    }
  }

}
