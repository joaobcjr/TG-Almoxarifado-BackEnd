import { Injectable, NotFoundException } from '@nestjs/common';
import { InsertLocalDto, GetLocalDto, UpdateLocalDto } from './local.dto';
import { Local } from './local.entity';
import { LocalRepository } from './local.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocalService {
    constructor(
        @InjectRepository(LocalRepository)
        private localRepository: LocalRepository
    ) { }

    async insertLocal(insertLocalDto: InsertLocalDto): Promise<Local> {
        return await this.localRepository.insertLocal(insertLocalDto);
    }

    async getLocalById(id: number): Promise<Local> {
        const found = await this.localRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Local com ID '${id}' não encontrado`);
        }

        return found
    }

    async getLocal(getLocalDto: GetLocalDto): Promise<Local[]> {
        return await this.localRepository.getFilteredLocal(getLocalDto);
    }

    async updateLocal(updateLocalDto: UpdateLocalDto): Promise<Local> {
        const local = await this.getLocalById(updateLocalDto.id);
        return await this.localRepository.updateLocal(updateLocalDto, local);

    }

    async deleteLocal(id: number): Promise<void> {
        const result = await this.localRepository.delete(id);
        if (result.affected === 0)
            throw new NotFoundException(`Local com ID '${id}' não encontrado`);
    }
}
