import { Grupo_Material } from "./grupo_material.entity";
import { EntityRepository, Repository } from "typeorm";
import { InsertGrupoDto, GetGrupoDto, UpdateGrupoDto } from "./grupo_material.dto";

@EntityRepository(Grupo_Material)
export class GrupoRepository extends Repository<Grupo_Material>{

    async insertGrupo(insertGrupoDto: InsertGrupoDto): Promise<Grupo_Material> {
        const { descricao } = insertGrupoDto;
        const grupo = new Grupo_Material();

        grupo.descricao = descricao;

        return await grupo.save();
    }

    async getFilteredGrupo(getGrupoDto: GetGrupoDto): Promise<Grupo_Material[]> {
        const { descricao } = getGrupoDto

        const query = this.createQueryBuilder('grupo');

        if (descricao) {
            query.andWhere('UPPER(grupo.descricao) LIKE UPPER(:search)', { search: `%${descricao}%` })
        }

        query.orderBy('id_grupo_material');

        return await query.getMany();

    }

    async updateGrupo(updateGrupoDto: UpdateGrupoDto, grupo: Grupo_Material): Promise<Grupo_Material> {
        const { descricao } = updateGrupoDto

        grupo.descricao = descricao;

        return await grupo.save();
    }
}