


import { Inventario, Status } from "./inventario.entity";
import { EntityRepository, Repository, getRepository } from "typeorm";
import { InsertInventarioDto, GetInventarioDto, InventarioStatusDto } from "./inventario.dto";
import { Inventario_material } from "./inventario_material/inventario_material.entity";
import { Material } from "src/material/material.entity";


@EntityRepository(Inventario)
export class InventarioRepository extends Repository<Inventario>{

    async insertInventario(insertInventarioDto: InsertInventarioDto): Promise<Inventario> {
        const { id_funcionario, materiais } = insertInventarioDto;

        const dataAtual = new Date();
        dataAtual.setHours(0);
        dataAtual.setMinutes(0);
        dataAtual.setSeconds(0);
        dataAtual.setMilliseconds(0);

        const inventario = Inventario.create({
            id_funcionario: id_funcionario,
            data: dataAtual,
            status: Status.Aberto
        });

        for (let x = 0; x < materiais.length; x++) {
            const inventario_material = new Inventario_material();
            inventario_material.material = await getRepository(Material).findOne(materiais[x].id_material);
            inventario_material.qtde = materiais[x].qtde;
            inventario_material.inventario = inventario;

            await inventario_material.save()
        }

        return await this.findOne({ relations: ['inventario_material'] })
    }

    async getFilteredInventario(getInventarioDto: GetInventarioDto): Promise<Inventario[]> {
        const { data, status } = getInventarioDto;
        const query = this.createQueryBuilder('inventario');

        if (data)
            query.andWhere(`inventario.data = to_date('${data}','DD/MM/YYYY')`)

        if (status)
            query.andWhere(`inventario.status = '${status}'`)

        query.innerJoinAndSelect('inventario.funcionario', 'funcionario');
        query.innerJoinAndSelect('inventario.inventario_material', 'inventario_material');

        query.orderBy('inventario.id_inventario');

        return await query.getMany();

    }

    async updateStatus(inventarioStatusDto: InventarioStatusDto, id: number): Promise<Inventario> {
        const { status } = inventarioStatusDto;
        const inventario = await this.findOne(id);

        inventario.status = status;
        await inventario.save();

        return await this.findOne({ relations: ['inventario_material'] })
    }
}