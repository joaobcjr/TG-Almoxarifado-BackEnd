import { Material } from "./material.entity";
import { EntityRepository, Repository } from "typeorm";
import { InsertMaterialDto, GetMaterialDto, UpdateMaterialDto } from "./material.dto";

@EntityRepository(Material)
export class MaterialRepository extends Repository<Material>{

    async insertMaterial(insertMaterialDto: InsertMaterialDto): Promise<Material> {
        const { cod_barra, descricao, id_un_medida, custo, estoque_atual, estoque_minimo, id_fabricante, id_local, id_grupo_material } = insertMaterialDto;
        const material = new Material();

        material.cod_barra = cod_barra;
        material.descricao = descricao;
        material.id_un_medida = id_un_medida;
        material.custo = custo;
        material.estoque_atual = estoque_atual;
        material.estoque_minimo = estoque_minimo;
        material.id_fabricante = id_fabricante;
        material.id_local = id_local;
        material.id_grupo_material = id_grupo_material;

        return await material.save();
    }

    async getFilteredMaterial(getMaterialDto: GetMaterialDto): Promise<Material[]> {
        const { cod_barra, descricao, estoque_atual, id_fabricante, id_local } = getMaterialDto

        const query = this.createQueryBuilder('material');

        query.innerJoinAndSelect('material.un_medida', 'un_medida');
        query.innerJoinAndSelect('material.fabricante', 'fabricante');
        query.innerJoinAndSelect('material.local', 'local');
        query.innerJoinAndSelect('material.grupo_material', 'grupo_material');

        if (cod_barra) {
            query.andWhere('material.cod_barra = :search', { search: cod_barra })
        }

        if (descricao) {
            query.andWhere('UPPER(material.descricao) LIKE UPPER(:search)', { search: `%${descricao}%` })
        }

        if (estoque_atual) {
            query.andWhere('material.estoque_atual = :search', { search: estoque_atual })
        }

        if (id_fabricante) {
            query.andWhere('material.id_fabricante = :search', { search: id_fabricante })
        }

        if (id_local) {
            query.andWhere('material.id_local = :search', { search: id_local })
        }

        query.orderBy('material.descricao');

        return await query.getMany();

    }

    async updateMaterial(updateMaterialDto: UpdateMaterialDto, material: Material): Promise<Material> {
        const { cod_barra, descricao, id_un_medida, custo, estoque_atual, estoque_minimo, id_fabricante, id_local, id_grupo_material } = updateMaterialDto

        if (cod_barra) {
            material.cod_barra = cod_barra;
        }

        if (descricao) {
            material.descricao = descricao;
        }

        if (id_un_medida) {
            material.id_un_medida = id_un_medida;
        }

        if (custo) {
            material.custo = custo;
        }

        if (estoque_atual) {
            material.estoque_atual = estoque_atual;
        }

        if (estoque_minimo) {
            material.estoque_minimo = estoque_minimo;
        }

        if (id_fabricante) {
            material.id_fabricante = id_fabricante;
        }

        if (id_local) {
            material.id_local = id_local;
        }

        if (id_grupo_material) {
            material.id_grupo_material = id_grupo_material;
        }

        return await material.save();
    }
}