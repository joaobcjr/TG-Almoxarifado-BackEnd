import { Injectable, NotFoundException } from '@nestjs/common';
import { InsertMaterialDto, GetMaterialDto, UpdateMaterialDto } from './material.dto';
import { Material } from './material.entity';
import { MaterialRepository } from './material.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MaterialService {
    constructor(
        @InjectRepository(MaterialRepository)
        private materialRepository: MaterialRepository
    ) { }

    async insertMaterial(insertMaterialDto: InsertMaterialDto): Promise<Material> {
        return await this.materialRepository.insertMaterial(insertMaterialDto);
    }

    async getMaterialById(id: number): Promise<Material> {
        const found = await this.materialRepository.findOne({
            where: {
                id_material: id
            },
            relations: ['un_medida', 'fabricante', 'local', 'grupo_material',]
        });

        if (!found) {
            throw new NotFoundException(`Material com ID '${id}' não encontrado`);
        }

        return found
    }

    async getMaterial(getMaterialDto: GetMaterialDto): Promise<Material[]> {
        return await this.materialRepository.getFilteredMaterial(getMaterialDto);
    }

    async updateMaterial(updateMaterialDto: UpdateMaterialDto): Promise<Material> {
        const material = await this.getMaterialById(updateMaterialDto.id);
        return await this.materialRepository.updateMaterial(updateMaterialDto, material);

    }

    async deleteMaterial(id: number): Promise<void> {
        const result = await this.materialRepository.delete(id);
        if (result.affected === 0)
            throw new NotFoundException(`Material com ID '${id}' não encontrado`);
    }
}
