import { Solicitacao } from './solicitacao.entity';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import { InsertSolicitacaoDto, GetSolicitacaoDto } from './solicitacao.dto';
import { Solicitacao_material } from './solicitacao_material/solicitacao_material.entity';
import { Material } from 'src/material/material.entity';

@EntityRepository(Solicitacao)
export class SolicitacaoRepository extends Repository<Solicitacao> {
  async insertSolicitacao(
    insertSolicitacaoDto: InsertSolicitacaoDto,
  ): Promise<Solicitacao> {
    const { id_funcionario, materiais } = insertSolicitacaoDto;

    const dataAtual = new Date();
    dataAtual.setHours(0);
    dataAtual.setMinutes(0);
    dataAtual.setSeconds(0);
    dataAtual.setMilliseconds(0);

    const solicitacao = Solicitacao.create({
      id_funcionario: id_funcionario,
      data: dataAtual,
    });

    for (let x = 0; x < materiais.length; x++) {
      const solicitacao_material = new Solicitacao_material();
      solicitacao_material.material = await getRepository(Material).findOne(
        materiais[x].id_material,
      );
      solicitacao_material.qtde = materiais[x].qtde;
      solicitacao_material.solicitacao = solicitacao;

      await solicitacao_material.save();
    }

    return await this.getSolicitacaoById(solicitacao.id_solicitacao);
  }

  async getFilteredSolicitacao(
    getSolicitacaoDto: GetSolicitacaoDto,
  ): Promise<Solicitacao[]> {
    const { data } = getSolicitacaoDto;
    const query = this.createQueryBuilder('solicitacao');
    query.addSelect('solicitacao_material.qtde');
    query.addSelect('material.id_material');
    query.addSelect('material.descricao');
    query.addSelect('funcionario.id_funcionario');
    query.addSelect('funcionario.nome');

    if (data)
      query.andWhere(`solicitacao.data = to_date('${data}','DD/MM/YYYY')`);

    query.innerJoin('solicitacao.funcionario', 'funcionario');
    query.innerJoin('solicitacao.solicitacao_material', 'solicitacao_material');
    query.innerJoin('solicitacao_material.material', 'material');

    query.orderBy('solicitacao.id_solicitacao');

    return await query.getMany();
  }

  async getSolicitacaoById(id: number): Promise<Solicitacao> {
    const query = this.createQueryBuilder('solicitacao');
    query.addSelect('solicitacao_material.qtde');
    query.addSelect('material.id_material');
    query.addSelect('material.descricao');
    query.addSelect('funcionario.id_funcionario');
    query.addSelect('funcionario.nome');

    query.andWhere(`solicitacao.id_solicitacao = ${id}`);

    query.innerJoin('solicitacao.funcionario', 'funcionario');
    query.innerJoin('solicitacao.solicitacao_material', 'solicitacao_material');
    query.innerJoin('solicitacao_material.material', 'material');

    query.orderBy('solicitacao.id_solicitacao');

    return await query.getOne();
  }
}
