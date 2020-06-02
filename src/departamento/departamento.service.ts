import { Injectable, NotFoundException } from '@nestjs/common';
import { InsertDepartamentoDto, GetDepartamentoDto, UpdateDepartamentoDto } from './departamento.dto';
import { Departamento } from './departamento.entity';
import { DepartamentoRepository } from './departamento.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DepartamentoService {
    constructor(
        @InjectRepository(DepartamentoRepository)
        private departamentoRepository: DepartamentoRepository
    ) { }

    async insertDepartamento(insertDepartamentoDto: InsertDepartamentoDto): Promise<Departamento> {
        return await this.departamentoRepository.insertDepartamento(insertDepartamentoDto);
    }

    async getDepartamentoById(id: number): Promise<Departamento> {
        const found = await this.departamentoRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Departamento com ID '${id}' não encontrado`);
        }

        return found
    }

    async getDepartamento(getDepartamentoDto: GetDepartamentoDto): Promise<Departamento[]> {
        return await this.departamentoRepository.getFilteredDepartamento(getDepartamentoDto);
    }

    async updateDepartamento(updateDepartamentoDto: UpdateDepartamentoDto): Promise<Departamento> {
        const departamento = await this.getDepartamentoById(updateDepartamentoDto.id);
        return await this.departamentoRepository.updateDepartamento(updateDepartamentoDto, departamento);

    }

    async deleteDepartamento(id: number): Promise<void> {
        const result = await this.departamentoRepository.delete(id);
        if (result.affected === 0)
            throw new NotFoundException(`Departamento com ID '${id}' não encontrado`);
    }
}
