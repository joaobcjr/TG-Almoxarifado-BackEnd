import { Module } from '@nestjs/common';
import { UnMedidaController } from './un_medida.controller';
import { UnMedidaService } from './un_medida.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnMedidaRepository } from './un_medida.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UnMedidaRepository
    ])
  ],
  controllers: [UnMedidaController],
  providers: [UnMedidaService]
})
export class UnMedidaModule { }
