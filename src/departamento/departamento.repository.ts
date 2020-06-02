import { Departamento } from "./departamento.entity";
import { EntityRepository, Repository } from "typeorm";
import { InsertDepartamentoDto, GetDepartamentoDto, UpdateDepartamentoDto } from "./departamento.dto";

@EntityRepository(Departamento)
export class DepartamentoRepository extends Repository<Departamento>{

    async insertDepartamento(insertDepartamentoDto: InsertDepartamentoDto): Promise<Departamento> {
        const { descricao } = insertDepartamentoDto;
        const departamento = new Departamento();

        departamento.descricao = descricao;

        return await departamento.save();
    }

    async getFilteredDepartamento(getDepartamentoDto: GetDepartamentoDto): Promise<Departamento[]> {
        const { descricao } = getDepartamentoDto

        const query = this.createQueryBuilder('departamento');

        if (descricao) {
            query.andWhere('UPPER(departamento.descricao) LIKE UPPER(:search)', { search: `%${descricao}%` })
        }

        query.orderBy('descricao');

        return await query.getMany();

    }

    async updateDepartamento(updateDepartamentoDto: UpdateDepartamentoDto, departamento: Departamento): Promise<Departamento> {
        const { descricao } = updateDepartamentoDto

        if (descricao) {
            departamento.descricao = descricao;
        }

        return await departamento.save();
    }
}