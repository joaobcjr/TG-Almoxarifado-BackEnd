import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InsertUnMedidaDto, GetUnMedidaDto, UpdateUnMedidaDto } from './un_medida.dto';
import { Un_Medida } from './un_medida.entity';
import { UnMedidaRepository } from './un_medida.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UnMedidaService {
    constructor(
        @InjectRepository(UnMedidaRepository)
        private unMedidaRepository: UnMedidaRepository
    ) { }

    async insertUnMedida(insertUnMedidaDto: InsertUnMedidaDto): Promise<Un_Medida> {

        if (await this.unMedidaRepository.existsData(insertUnMedidaDto.id)) {
            throw new ConflictException(`Unidade: '${insertUnMedidaDto.id}' já existe`)
        }
        return await this.unMedidaRepository.insertUnMedida(insertUnMedidaDto);
    }

    async getUnMedidaById(id: string): Promise<Un_Medida> {
        const found = await this.unMedidaRepository.findById(id);

        if (!found) {
            throw new NotFoundException(`Unidade de medida com ID '${id}' não encontrado`);
        }

        return found
    }

    async getUnMedida(getUnMedidaDto: GetUnMedidaDto): Promise<Un_Medida[]> {
        return await this.unMedidaRepository.getFilteredUnMedida(getUnMedidaDto);
    }

    async updateUnMedida(updateUnMedidaDto: UpdateUnMedidaDto): Promise<Un_Medida> {
        const unMedida = await this.getUnMedidaById(updateUnMedidaDto.id);
        return await this.unMedidaRepository.updateUnMedida(updateUnMedidaDto, unMedida);

    }

    async deleteUnMedida(id: number): Promise<void> {
        const result = await this.unMedidaRepository.delete(id);
        if (result.affected === 0)
            throw new NotFoundException(`Unidade de medida com ID '${id}' não encontrado`);
    }
}
