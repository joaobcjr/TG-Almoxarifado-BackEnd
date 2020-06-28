import { Inventario, Status } from './inventario.entity';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import {
  InsertInventarioDto,
  GetInventarioDto,
  InventarioStatusDto,
} from './inventario.dto';
import { Inventario_material } from './inventario_material/inventario_material.entity';
import { Material } from 'src/material/material.entity';
import { HttpException, ForbiddenException } from '@nestjs/common';
import { promises } from 'dns';

@EntityRepository(Inventario)
export class InventarioRepository extends Repository<Inventario> {
  async insertInventario(
    insertInventarioDto: InsertInventarioDto,
  ): Promise<Inventario> {
    const { id_funcionario, materiais } = insertInventarioDto;

    const dataAtual = new Date();
    dataAtual.setHours(0);
    dataAtual.setMinutes(0);
    dataAtual.setSeconds(0);
    dataAtual.setMilliseconds(0);

    const inventario = Inventario.create({
      id_funcionario: id_funcionario,
      data: dataAtual,
      status: Status.Aberto,
    });

    for (let x = 0; x < materiais.length; x++) {
      const inventario_material = new Inventario_material();
      inventario_material.material = await getRepository(Material).findOne(
        materiais[x].id_material,
      );
      inventario_material.qtde = materiais[x].qtde;
      inventario_material.inventario = inventario;

      await inventario_material.save();
    }

    return await this.getInventarioById(inventario.id_inventario);
  }

  async getFilteredInventario(
    getInventarioDto: GetInventarioDto,
  ): Promise<Inventario[]> {
    const { data, status } = getInventarioDto;
    const query = this.createQueryBuilder('inventario');
    query.addSelect('inventario_material.qtde');
    query.addSelect('material.id_material');
    query.addSelect('material.descricao');
    query.addSelect('funcionario.id_funcionario');
    query.addSelect('funcionario.nome');

    if (data)
      query.andWhere(`inventario.data = to_date('${data}','DD/MM/YYYY')`);

    if (status) query.andWhere(`inventario.status = '${status}'`);

    query.innerJoin('inventario.funcionario', 'funcionario');
    query.innerJoin('inventario.inventario_material', 'inventario_material');
    query.innerJoin('inventario_material.material', 'material');

    query.orderBy('inventario.id_inventario');

    return await query.getMany();
  }

  async getInventarioById(id: number): Promise<Inventario> {
    const query = this.createQueryBuilder('inventario');
    query.addSelect('inventario_material.qtde');
    query.addSelect('material.id_material');
    query.addSelect('material.descricao');
    query.addSelect('funcionario.id_funcionario');
    query.addSelect('funcionario.nome');

    query.andWhere(`inventario.id_inventario = '${id}'`);

    query.innerJoin('inventario.funcionario', 'funcionario');
    query.innerJoin('inventario.inventario_material', 'inventario_material');
    query.innerJoin('inventario_material.material', 'material');

    query.orderBy('inventario.id_inventario');

    return await query.getOne();
  }

  async updateStatus(
    inventarioStatusDto: InventarioStatusDto,
    id: number,
  ): Promise<Inventario> {
    const { status } = inventarioStatusDto;
    const inventario = await this.findOne(id);

    //if (inventario.status == Status.Fechado) {
    //  throw new ForbiddenException(`Inventário ID '${id}' já está fechado`);
    //}

    inventario.status = status;
    await inventario.save();

    const inventarioAtualizado = await this.getInventarioById(
      inventario.id_inventario,
    );
    //Atualiza o estoque
    if (status == Status.Fechado) {
      await Promise.all(
        inventarioAtualizado.inventario_material.map(async element => {
          element.material.estoque_atual = element.qtde;
          element.material.save();
        }),
      );
    }

    return inventarioAtualizado;
  }
}
