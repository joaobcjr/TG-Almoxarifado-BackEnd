import { Injectable, NotFoundException } from '@nestjs/common';
import { InsertGrupoDto, GetGrupoDto, UpdateGrupoDto } from './grupo_material.dto';
import { Grupo_Material } from './grupo_material.entity';
import { GrupoRepository } from './grupo_material.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GrupoService {
    constructor(
        @InjectRepository(GrupoRepository)
        private grupoRepository: GrupoRepository
    ) { }

    async insertGrupo(insertGrupoDto: InsertGrupoDto): Promise<Grupo_Material> {
        return await this.grupoRepository.insertGrupo(insertGrupoDto);
    }

    async getGrupoById(id: number): Promise<Grupo_Material> {
        const found = await this.grupoRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Grupo com ID '${id}' não encontrado`);
        }

        return found
    }

    async getGrupo(getGrupoDto: GetGrupoDto): Promise<Grupo_Material[]> {
        return await this.grupoRepository.getFilteredGrupo(getGrupoDto);
    }

    async updateGrupo(updateGrupoDto: UpdateGrupoDto): Promise<Grupo_Material> {
        const grupo = await this.getGrupoById(updateGrupoDto.id);
        return await this.grupoRepository.updateGrupo(updateGrupoDto, grupo);

    }

    async deleteGrupo(id: number): Promise<void> {
        const result = await this.grupoRepository.delete(id);
        if (result.affected === 0)
            throw new NotFoundException(`Grupo com ID '${id}' não encontrado`);
    }
}
