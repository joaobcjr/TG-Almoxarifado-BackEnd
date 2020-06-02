import { Module } from '@nestjs/common';
import { SolicitacaoController } from './solicitacao.controller';
import { SolicitacaoService } from './solicitacao.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitacaoRepository } from './solicitacao.repository';
import { MaterialService } from 'src/material/material.service';
import { MaterialRepository } from 'src/material/material.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SolicitacaoRepository,
      MaterialRepository
    ])
  ],
  controllers: [SolicitacaoController],
  providers: [SolicitacaoService, MaterialService]
})
export class SolicitacaoModule { }
