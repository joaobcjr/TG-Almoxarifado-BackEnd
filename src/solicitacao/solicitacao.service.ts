import { Injectable, NotFoundException } from '@nestjs/common';
import {
  InsertSolicitacaoDto,
  GetSolicitacaoDto,
  SolicitacaoVisualizarDto,
} from './solicitacao.dto';
import { Solicitacao } from './solicitacao.entity';
import { SolicitacaoRepository } from './solicitacao.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialService } from 'src/material/material.service';

@Injectable()
export class SolicitacaoService {
  constructor(
    @InjectRepository(SolicitacaoRepository)
    private solicitacaoRepository: SolicitacaoRepository,
    private materialService: MaterialService,
  ) {}

  async insertSolicitacao(
    insertSolicitacaoDto: InsertSolicitacaoDto,
  ): Promise<Solicitacao> {
    for (let x = 0; x < insertSolicitacaoDto.materiais.length; x++) {
      await this.materialService.getMaterialById(
        insertSolicitacaoDto.materiais[x].id_material,
      );
    }
    return await this.solicitacaoRepository.insertSolicitacao(
      insertSolicitacaoDto,
    );
  }

  async getSolicitacaoById(id: number): Promise<Solicitacao> {
    const found = await this.solicitacaoRepository.getSolicitacaoById(id);

    if (!found) {
      throw new NotFoundException(`Solicitacao com ID '${id}' não encontrado`);
    }

    return found;
  }

  async getSolicitacao(
    getSolicitacaoDto: GetSolicitacaoDto,
  ): Promise<Solicitacao[]> {
    return await this.solicitacaoRepository.getFilteredSolicitacao(
      getSolicitacaoDto,
    );
  }

  async visualizarSolicitacao(
    id: number,
    solicitacaoVisualizarDto: SolicitacaoVisualizarDto,
  ): Promise<Solicitacao> {
    await this.getSolicitacaoById(id);
    return await this.solicitacaoRepository.visualizarSolicitacao(
      solicitacaoVisualizarDto,
      id,
    );
  }
}
