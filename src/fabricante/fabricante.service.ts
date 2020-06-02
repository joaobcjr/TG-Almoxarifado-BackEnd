import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InsertFabricanteDto, GetFabricanteDto, UpdateFabricanteDto } from './fabricante.dto';
import { Fabricante } from './fabricante.entity';
import { FabricanteRepository } from './fabricante.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FabricanteService {
    constructor(
        @InjectRepository(FabricanteRepository)
        private fabricanteRepository: FabricanteRepository
    ) { }

    async insertFabricante(insertFabricanteDto: InsertFabricanteDto): Promise<Fabricante> {
        return await this.fabricanteRepository.insertFabricante(insertFabricanteDto);
    }

    async getFabricanteById(id: number): Promise<Fabricante> {
        const found = await this.fabricanteRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Fabricante com ID '${id}' não encontrado`);
        }

        return found
    }

    async getFabricante(getFabricanteDto: GetFabricanteDto): Promise<Fabricante[]> {
        return await this.fabricanteRepository.getFilteredFabricante(getFabricanteDto);
    }

    async updateFabricante(updateFabricanteDto: UpdateFabricanteDto): Promise<Fabricante> {
        const fabricante = await this.getFabricanteById(updateFabricanteDto.id);
        return await this.fabricanteRepository.updateFabricante(updateFabricanteDto, fabricante);

    }

    async deleteFabricante(id: number): Promise<void> {
        const result = await this.fabricanteRepository.delete(id);
        if (result.affected === 0)
            throw new NotFoundException(`Fabricante com ID '${id}' não encontrado`);
    }
}
