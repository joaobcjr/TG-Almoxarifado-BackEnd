import { Solicitacao } from './solicitacao.entity';
import { EntityRepository, Repository, getRepository } from "typeorm";
import { InsertSolicitacaoDto, GetSolicitacaoDto } from './solicitacao.dto';
import { Solicitacao_material } from "./solicitacao_material/solicitacao_material.entity";
import { Material } from "src/material/material.entity";


@EntityRepository(Solicitacao)
export class SolicitacaoRepository extends Repository<Solicitacao>{

    async insertSolicitacao(insertSolicitacaoDto: InsertSolicitacaoDto): Promise<Solicitacao> {
        const { id_funcionario, materiais } = insertSolicitacaoDto;

        const dataAtual = new Date();
        dataAtual.setHours(0);
        dataAtual.setMinutes(0);
        dataAtual.setSeconds(0);
        dataAtual.setMilliseconds(0);

        const solicitacao = Solicitacao.create({
            id_funcionario: id_funcionario,
            data: dataAtual
        });

        for (let x = 0; x < materiais.length; x++) {
            const solicitacao_material = new Solicitacao_material();
            solicitacao_material.material = await getRepository(Material).findOne(materiais[x].id_material);
            solicitacao_material.qtde = materiais[x].qtde;
            solicitacao_material.solicitacao = solicitacao;

            await solicitacao_material.save()
        }

        return await this.findOne({ relations: ['solicitacao_material'] })
    }

    async getFilteredSolicitacao(getSolicitacaoDto: GetSolicitacaoDto): Promise<Solicitacao[]> {
        const { data } = getSolicitacaoDto;
        const query = this.createQueryBuilder('solicitacao');

        if (data)
            query.andWhere(`solicitacao.data = to_date('${data}','DD/MM/YYYY')`)

        query.innerJoinAndSelect('solicitacao.funcionario', 'funcionario');
        query.innerJoinAndSelect('solicitacao.solicitacao_material', 'solicitacao_material');

        query.orderBy('solicitacao.id_solicitacao');

        return await query.getMany();

    }
}