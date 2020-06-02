import { Controller, Get, Body, ValidationPipe, Post, Patch, Param, ParseIntPipe, Query } from '@nestjs/common';
import { InsertRequisicaoDto, GetRequisicaoDto, RequisicaoAtenderDto } from './Requisicao.dto';
import { RequisicaoService } from './requisicao.service'
import { Requisicao } from './requisicao.entity';

@Controller('requisicao')

export class RequisicaoController {
    constructor(
        private requisicaoService: RequisicaoService
    ) { }

    @Get('/:id')
    getRequisicaoByID(@Param('id', ParseIntPipe) id: number): Promise<Requisicao> {
        return this.requisicaoService.getRequisicaoById(id);
    }

    @Get()
    getRequisicao(@Query(ValidationPipe) getRequisicaoDto: GetRequisicaoDto): Promise<Requisicao[]> {
        return this.requisicaoService.getRequisicao(getRequisicaoDto);
    }

    @Post()
    async insertRequisicao(@Body(ValidationPipe) insertRequisicaoDto: InsertRequisicaoDto): Promise<Requisicao> {
        return this.requisicaoService.insertRequisicao(insertRequisicaoDto);
    }

    @Patch('/atender/:id')
    async patchRequisicao(
        @Param('id', ParseIntPipe) id: number,
        @Body() requisicaoAtenderDto: RequisicaoAtenderDto
    ): Promise<Requisicao> {
        return await this.requisicaoService.atenderRequisicao(id, requisicaoAtenderDto)
    }

}
