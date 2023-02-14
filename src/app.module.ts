import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONN,
    { useNewUrlParser: true, useUnifiedTopology: true }),
    CategoriasModule,
    JogadoresModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
