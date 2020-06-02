import { Injectable, NotFoundException } from '@nestjs/common';
import { InsertRequisicaoDto, GetRequisicaoDto, RequisicaoAtenderDto } from './requisicao.dto'
import { Requisicao } from './requisicao.entity';
import { RequisicaoRepository } from './requisicao.repository'
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialService } from 'src/material/material.service';

@Injectable()
export class RequisicaoService {
    constructor(
        @InjectRepository(RequisicaoRepository)
        private requisicaoRepository: RequisicaoRepository,
        private materialService: MaterialService
    ) { }

    async insertRequisicao(insertRequisicaoDto: InsertRequisicaoDto): Promise<Requisicao> {
        for (let x = 0; x < insertRequisicaoDto.materiais.length; x++) {
            await this.materialService.getMaterialById(insertRequisicaoDto.materiais[x].id_material);
        }
        return await this.requisicaoRepository.insertRequisicao(insertRequisicaoDto);
    }

    async getRequisicaoById(id: number): Promise<Requisicao> {

        const found = await this.requisicaoRepository.findOne({
            where: {
                id_requisicao: id
            },
            relations: ['requisicao_material', 'funcionario']
        });

        if (!found) {
            throw new NotFoundException(`Requisicao com ID '${id}' não encontrado`);
        }

        return found
    }

    async getRequisicao(getRequisicaoDto: GetRequisicaoDto): Promise<Requisicao[]> {
        return await this.requisicaoRepository.getFilteredRequisicao(getRequisicaoDto);
    }

    async atenderRequisicao(id: number, requisicaoAtenderDto: RequisicaoAtenderDto): Promise<Requisicao> {
        const requisicao = await this.getRequisicaoById(id);
        return await this.requisicaoRepository.atenderRequisicao(requisicaoAtenderDto, requisicao);

    }
}
