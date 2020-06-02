import { Un_Medida } from "./un_medida.entity";
import { EntityRepository, Repository } from "typeorm";
import { InsertUnMedidaDto, GetUnMedidaDto, UpdateUnMedidaDto } from "./un_medida.dto";

@EntityRepository(Un_Medida)
export class UnMedidaRepository extends Repository<Un_Medida>{

    async insertUnMedida(insertUnMedidaDto: InsertUnMedidaDto): Promise<Un_Medida> {
        const { id, descricao } = insertUnMedidaDto;
        const unMedida = new Un_Medida();

        unMedida.id_un_medida = id;
        unMedida.descricao = descricao;

        return await unMedida.save();
    }

    async getFilteredUnMedida(getUnMedidaDto: GetUnMedidaDto): Promise<Un_Medida[]> {
        const { id, descricao } = getUnMedidaDto

        const query = this.createQueryBuilder('un_medida');

        if (id) {
            query.andWhere('UPPER(un_medida.id_un_medida) LIKE UPPER(:search)', { search: `%${id}%` })
        }

        if (descricao) {
            query.andWhere('UPPER(un_medida.descricao) LIKE UPPER(:search)', { search: `%${descricao}%` })
        }

        query.orderBy('id_un_medida');

        return await query.getMany();

    }

    async updateUnMedida(updateUnMedidaDto: UpdateUnMedidaDto, unMedida: Un_Medida): Promise<Un_Medida> {
        const { descricao } = updateUnMedidaDto

        if (descricao) {
            unMedida.descricao = descricao;
        }

        return await unMedida.save();
    }

    async existsData(id: string): Promise<boolean> {

        const query = await this.createQueryBuilder("un_medida");
        query.select("COUNT(1)", "count")
        query.andWhere('UPPER(un_medida.id_un_medida) = UPPER(:search)', { search: id })

        const { count } = await query.getRawOne();

        return count >= 1;
    }

    async findById(id: string): Promise<Un_Medida> {

        const query = await this.createQueryBuilder("un_medida");

        query.andWhere('UPPER(un_medida.id_un_medida) = UPPER(:search)', { search: id })

        return await query.getOne();
    }
}