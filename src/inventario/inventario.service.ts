import { Injectable, NotFoundException } from '@nestjs/common';
import { InsertInventarioDto, GetInventarioDto, InventarioStatusDto } from './inventario.dto'
import { Inventario } from './inventario.entity';
import { InventarioRepository } from './inventario.repository'
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialService } from 'src/material/material.service';

@Injectable()
export class InventarioService {
    constructor(
        @InjectRepository(InventarioRepository)
        private inventarioRepository: InventarioRepository,
        private materialService: MaterialService
    ) { }

    async insertInventario(insertInventarioDto: InsertInventarioDto): Promise<Inventario> {
        for (let x = 0; x < insertInventarioDto.materiais.length; x++) {
            await this.materialService.getMaterialById(insertInventarioDto.materiais[x].id_material);
        }
        return await this.inventarioRepository.insertInventario(insertInventarioDto);
    }

    async getInventarioById(id: number): Promise<Inventario> {

        const found = await this.inventarioRepository.findOne({
            where: {
                id_inventario: id
            },
            relations: ['inventario_material', 'funcionario']
        });

        if (!found) {
            throw new NotFoundException(`Inventario com ID '${id}' não encontrado`);
        }

        return found
    }

    async getInventario(getInventarioDto: GetInventarioDto): Promise<Inventario[]> {
        return await this.inventarioRepository.getFilteredInventario(getInventarioDto);
    }

    async updateStatus(id: number, inventarioStatusDto: InventarioStatusDto): Promise<Inventario> {
        await this.getInventarioById(id);
        return await this.inventarioRepository.updateStatus(inventarioStatusDto, id);

    }
}
