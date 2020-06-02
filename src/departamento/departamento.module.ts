import { Module } from '@nestjs/common';
import { DepartamentoController } from './departamento.controller';
import { DepartamentoService } from './departamento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoRepository } from './departamento.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DepartamentoRepository
    ])
  ],
  controllers: [DepartamentoController],
  providers: [DepartamentoService]
})
export class DepartamentoModule { }
