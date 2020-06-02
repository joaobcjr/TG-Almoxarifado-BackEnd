import { Controller, Get, Body, ValidationPipe, Post, Param, ParseIntPipe, Query } from '@nestjs/common';
import { InsertSolicitacaoDto, GetSolicitacaoDto } from './solicitacao.dto';
import { SolicitacaoService } from './solicitacao.service'
import { Solicitacao } from './solicitacao.entity';

@Controller('solicitacao')

export class SolicitacaoController {
    constructor(
        private solicitacaoService: SolicitacaoService
    ) { }

    @Get('/:id')
    getSolicitacaoByID(@Param('id', ParseIntPipe) id: number): Promise<Solicitacao> {
        return this.solicitacaoService.getSolicitacaoById(id);
    }

    @Get()
    getSolicitacao(@Query(ValidationPipe) getSolicitacaoDto: GetSolicitacaoDto): Promise<Solicitacao[]> {
        return this.solicitacaoService.getSolicitacao(getSolicitacaoDto);
    }

    @Post()
    async insertSolicitacao(@Body(ValidationPipe) insertSolicitacaoDto: InsertSolicitacaoDto): Promise<Solicitacao> {
        return this.solicitacaoService.insertSolicitacao(insertSolicitacaoDto);
    }

}
