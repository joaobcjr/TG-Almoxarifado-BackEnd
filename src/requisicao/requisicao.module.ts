import { Module } from '@nestjs/common';
import { RequisicaoController } from './requisicao.controller';
import { RequisicaoService } from './requisicao.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequisicaoRepository } from './requisicao.repository';
import { MaterialService } from 'src/material/material.service';
import { MaterialRepository } from 'src/material/material.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RequisicaoRepository,
      MaterialRepository
    ])
  ],
  controllers: [RequisicaoController],
  providers: [RequisicaoService, MaterialService]
})
export class RequisicaoModule { }
