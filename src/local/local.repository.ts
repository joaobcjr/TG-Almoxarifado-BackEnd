import { Local } from "./local.entity";
import { EntityRepository, Repository } from "typeorm";
import { InsertLocalDto, GetLocalDto, UpdateLocalDto } from "./local.dto";

@EntityRepository(Local)
export class LocalRepository extends Repository<Local>{

    async insertLocal(insertLocalDto: InsertLocalDto): Promise<Local> {
        const { corredor, prateleira } = insertLocalDto;
        const local = new Local();

        local.corredor = corredor;
        local.prateleira = prateleira;

        return await local.save();
    }

    async getFilteredLocal(getLocalDto: GetLocalDto): Promise<Local[]> {
        const { corredor, prateleira } = getLocalDto

        const query = this.createQueryBuilder('local');

        if (corredor) {
            query.andWhere('UPPER(local.corredor) LIKE UPPER(:search)', { search: `%${corredor}%` })
        }

        if (prateleira) {
            query.andWhere('UPPER(local.prateleira) LIKE UPPER(:search)', { search: `%${prateleira}%` })
        }

        query.orderBy('id_local');

        return await query.getMany();

    }

    async updateLocal(updateLocalDto: UpdateLocalDto, local: Local): Promise<Local> {
        const { corredor, prateleira } = updateLocalDto

        if (corredor) {
            local.corredor = corredor;
        }

        if (prateleira) {
            local.prateleira = prateleira;
        }

        return await local.save();
    }
}