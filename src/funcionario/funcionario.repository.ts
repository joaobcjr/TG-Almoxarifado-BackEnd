import { Funcionario } from "./funcionario.entity";
import { EntityRepository, Repository } from "typeorm";
import { InsertFuncionarioDto, GetFuncionarioDto, UpdateFuncionarioDto } from "./funcionario.dto";

@EntityRepository(Funcionario)
export class FuncionarioRepository extends Repository<Funcionario>{

    async insertFuncionario(insertFuncionarioDto: InsertFuncionarioDto): Promise<Funcionario> {
        const { nome, senha, id_departamento } = insertFuncionarioDto;
        const funcionario = new Funcionario();

        funcionario.nome = nome;
        funcionario.senha = senha;
        funcionario.id_departamento = id_departamento;

        return await funcionario.save();
    }

    async getFilteredFuncionario(getFuncionarioDto: GetFuncionarioDto): Promise<Funcionario[]> {
        const { nome } = getFuncionarioDto

        const query = this.createQueryBuilder('funcionario');

        query.innerJoinAndSelect('funcionario.departamento', 'departamento');

        if (nome) {
            query.andWhere('UPPER(funcionario.nome) LIKE UPPER(:search)', { search: `%${nome}%` })
        }

        query.orderBy('nome,id_funcionario');

        return await query.getMany();

    }

    async updateFuncionario(updateFuncionarioDto: UpdateFuncionarioDto, funcionario: Funcionario): Promise<Funcionario> {
        const { senha, id_departamento } = updateFuncionarioDto

        funcionario.senha = senha;
        funcionario.id_departamento = id_departamento;

        return await funcionario.save();
    }
}