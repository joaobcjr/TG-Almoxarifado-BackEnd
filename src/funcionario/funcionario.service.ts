import { Injectable, NotFoundException } from '@nestjs/common';
import { InsertFuncionarioDto, GetFuncionarioDto, UpdateFuncionarioDto } from './funcionario.dto';
import { Funcionario } from './funcionario.entity';
import { FuncionarioRepository } from './funcionario.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FuncionarioService {
    constructor(
        @InjectRepository(FuncionarioRepository)
        private funcionarioRepository: FuncionarioRepository
    ) { }

    async insertFuncionario(insertFuncionarioDto: InsertFuncionarioDto): Promise<Funcionario> {
        return await this.funcionarioRepository.insertFuncionario(insertFuncionarioDto);
    }

    async getFuncionarioById(id: number): Promise<Funcionario> {

        const found = await this.funcionarioRepository.findOne({
            where: {
                id_funcionario: id
            },
            relations: ['departamento']
        });

        if (!found) {
            throw new NotFoundException(`Funcionario com ID '${id}' não encontrado`);
        }

        return found
    }

    async getFuncionario(getFuncionarioDto: GetFuncionarioDto): Promise<Funcionario[]> {
        return await this.funcionarioRepository.getFilteredFuncionario(getFuncionarioDto);
    }

    async updateFuncionario(updateFuncionarioDto: UpdateFuncionarioDto): Promise<Funcionario> {
        const funcionario = await this.getFuncionarioById(updateFuncionarioDto.id);
        return await this.funcionarioRepository.updateFuncionario(updateFuncionarioDto, funcionario);

    }

    async deleteFuncionario(id: number): Promise<void> {
        const result = await this.funcionarioRepository.delete(id);
        if (result.affected === 0)
            throw new NotFoundException(`Funcionario com ID '${id}' não encontrado`);
    }
}
