import {
  Controller,
  Get,
  Body,
  ValidationPipe,
  Post,
  Param,
  ParseIntPipe,
  Query,
  Patch,
} from '@nestjs/common';
import {
  InsertSolicitacaoDto,
  GetSolicitacaoDto,
  SolicitacaoVisualizarDto,
} from './solicitacao.dto';
import { SolicitacaoService } from './solicitacao.service';
import { Solicitacao } from './solicitacao.entity';

@Controller('solicitacao')
export class SolicitacaoController {
  constructor(private solicitacaoService: SolicitacaoService) {}

  @Get('/:id')
  getSolicitacaoByID(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Solicitacao> {
    return this.solicitacaoService.getSolicitacaoById(id);
  }

  @Get()
  getSolicitacao(
    @Query(ValidationPipe) getSolicitacaoDto: GetSolicitacaoDto,
  ): Promise<Solicitacao[]> {
    return this.solicitacaoService.getSolicitacao(getSolicitacaoDto);
  }

  @Post()
  async insertSolicitacao(
    @Body(ValidationPipe) insertSolicitacaoDto: InsertSolicitacaoDto,
  ): Promise<Solicitacao> {
    return this.solicitacaoService.insertSolicitacao(insertSolicitacaoDto);
  }

  @Patch('/visualizar/:id')
  async patchSolicitacao(
    @Param('id', ParseIntPipe) id: number,
    @Body() solicitacaoVisualizarDto: SolicitacaoVisualizarDto,
  ): Promise<Solicitacao> {
    return await this.solicitacaoService.visualizarSolicitacao(
      id,
      solicitacaoVisualizarDto,
    );
  }
}
