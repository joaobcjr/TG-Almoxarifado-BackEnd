import { Requisicao, Status } from './requisicao.entity';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import {
  InsertRequisicaoDto,
  GetRequisicaoDto,
  RequisicaoAtenderDto,
} from './requisicao.dto';
import { Requisicao_material } from './requisicao_material/requisicao_material.entity';
import { Material } from 'src/material/material.entity';

@EntityRepository(Requisicao)
export class RequisicaoRepository extends Repository<Requisicao> {
  async insertRequisicao(
    insertRequisicaoDto: InsertRequisicaoDto,
  ): Promise<Requisicao> {
    const { id_funcionario, materiais } = insertRequisicaoDto;

    const dataAtual = new Date();
    dataAtual.setHours(0);
    dataAtual.setMinutes(0);
    dataAtual.setSeconds(0);
    dataAtual.setMilliseconds(0);

    const requisicao = Requisicao.create({
      id_funcionario: id_funcionario,
      data: dataAtual,
      status: Status.Pendente,
    });

    for (let x = 0; x < materiais.length; x++) {
      const requisicao_material = new Requisicao_material();
      requisicao_material.material = await getRepository(Material).findOne(
        materiais[x].id_material,
      );
      requisicao_material.qtde = materiais[x].qtde;
      requisicao_material.qtde_atendida = 0;
      requisicao_material.requisicao = requisicao;

      await requisicao_material.save();
    }

    return await this.getRequisicaoById(requisicao.id_requisicao);
  }

  async getFilteredRequisicao(
    getRequisicaoDto: GetRequisicaoDto,
  ): Promise<Requisicao[]> {
    const { data } = getRequisicaoDto;
    const query = this.createQueryBuilder('requisicao');
    query.addSelect('requisicao_material.qtde');
    query.addSelect('requisicao_material.qtde_atendida');
    query.addSelect('material.id_material');
    query.addSelect('material.descricao');
    query.addSelect('material.estoque_atual');
    query.addSelect('funcionario.id_funcionario');
    query.addSelect('funcionario.nome');

    if (data)
      query.andWhere(`requisicao.data = to_date('${data}','DD/MM/YYYY')`);

    query.innerJoin('requisicao.funcionario', 'funcionario');
    query.innerJoin('requisicao.requisicao_material', 'requisicao_material');
    query.innerJoin('requisicao_material.material', 'material');

    query.orderBy('requisicao.id_requisicao');

    return await query.getMany();
  }

  async getRequisicaoById(id: number): Promise<Requisicao> {
    const query = this.createQueryBuilder('requisicao');
    query.addSelect('requisicao_material.qtde');
    query.addSelect('requisicao_material.qtde_atendida');
    query.addSelect('material.id_material');
    query.addSelect('material.descricao');
    query.addSelect('material.estoque_atual');
    query.addSelect('funcionario.id_funcionario');
    query.addSelect('funcionario.nome');

    query.andWhere(`requisicao.id_requisicao = ${id}`);

    query.innerJoin('requisicao.funcionario', 'funcionario');
    query.innerJoin('requisicao.requisicao_material', 'requisicao_material');
    query.innerJoin('requisicao_material.material', 'material');

    query.orderBy('requisicao.id_requisicao');

    return await query.getOne();
  }

  async atenderRequisicao(
    requisicaoAtenderDto: RequisicaoAtenderDto,
    requisicao: Requisicao,
  ): Promise<Requisicao> {
    const { materiais } = requisicaoAtenderDto;

    if (materiais) {
      let reqCompleto = true;
      let reqPendente = true;
      // Atende materiais indicados
      for (let x = 0; x < materiais.length; x++) {
        const requisicao_material = await getRepository(
          Requisicao_material,
        ).findOne({
          where: {
            requisicao: requisicao,
            id_material: materiais[x].id_material,
          },
        });

        const qtde_atualizada =
          requisicao_material.qtde_atendida +
          requisicaoAtenderDto.materiais[0].qtde;

        requisicao_material.qtde_atendida =
          qtde_atualizada >= requisicao_material.qtde
            ? requisicao_material.qtde
            : qtde_atualizada;

        //caso alguma requisicao não esteja completa então será false
        reqCompleto =
          reqCompleto &&
          requisicao_material.qtde_atendida == requisicao_material.qtde;

        //caso alguma requisicao não estiver pendente então será false
        reqPendente = reqPendente && requisicao_material.qtde_atendida == 0;

        await requisicao_material.save();
      }

      const requisicaoAtualizar = await this.findOne(requisicao.id_requisicao);

      if (reqCompleto) requisicaoAtualizar.status = Status.Atendido;
      else if (reqPendente) requisicaoAtualizar.status = Status.Pendente;
      else requisicaoAtualizar.status = Status.Parcialmente_Atendido;

      await requisicaoAtualizar.save();
    } else {
      //Atende todos os materiais
      const requisicao_material = await getRepository(Requisicao_material).find(
        {
          where: {
            requisicao: requisicao,
          },
        },
      );

      for (let x = 0; x < requisicao_material.length; x++) {
        requisicao_material[x].qtde_atendida = requisicao_material[x].qtde;
        await requisicao_material[x].save();
      }

      const requisicaoAtualizar = await this.findOne(requisicao.id_requisicao);
      requisicaoAtualizar.status = Status.Atendido;
      await requisicaoAtualizar.save();
    }

    return await this.getRequisicaoById(requisicao.id_requisicao);
  }
}
