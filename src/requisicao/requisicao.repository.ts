import { Requisicao } from "./requisicao.entity";
import { EntityRepository, Repository, getRepository } from "typeorm";
import { InsertRequisicaoDto, GetRequisicaoDto, RequisicaoAtenderDto } from "./requisicao.dto";
import { Requisicao_material } from "./requisicao_material/requisicao_material.entity";
import { Material } from "src/material/material.entity";


@EntityRepository(Requisicao)
export class RequisicaoRepository extends Repository<Requisicao>{

    async insertRequisicao(insertRequisicaoDto: InsertRequisicaoDto): Promise<Requisicao> {
        const { id_funcionario, materiais } = insertRequisicaoDto;

        const dataAtual = new Date();
        dataAtual.setHours(0);
        dataAtual.setMinutes(0);
        dataAtual.setSeconds(0);
        dataAtual.setMilliseconds(0);

        const requisicao = Requisicao.create({
            id_funcionario: id_funcionario,
            data: dataAtual
        });

        for (let x = 0; x < materiais.length; x++) {
            const requisicao_material = new Requisicao_material();
            requisicao_material.material = await getRepository(Material).findOne(materiais[x].id_material);
            requisicao_material.qtde = materiais[x].qtde;
            requisicao_material.qtde_atendida = 0;
            requisicao_material.requisicao = requisicao;

            await requisicao_material.save()
        }

        return await this.findOne({ relations: ['requisicao_material'] })
    }

    async getFilteredRequisicao(getRequisicaoDto: GetRequisicaoDto): Promise<Requisicao[]> {
        const { data } = getRequisicaoDto;
        const query = this.createQueryBuilder('requisicao');

        if (data)
            query.andWhere(`requisicao.data = to_date('${data}','DD/MM/YYYY')`)

        query.innerJoinAndSelect('requisicao.funcionario', 'funcionario');
        query.innerJoinAndSelect('requisicao.requisicao_material', 'requisicao_material');

        query.orderBy('requisicao.id_requisicao');

        return await query.getMany();

    }

    async atenderRequisicao(requisicaoAtenderDto: RequisicaoAtenderDto, requisicao: Requisicao): Promise<Requisicao> {
        const { materiais } = requisicaoAtenderDto

        if (materiais)
            for (let x = 0; x < materiais.length; x++) {
                const requisicao_material = await getRepository(Requisicao_material).findOne({
                    where:
                    {
                        requisicao: requisicao,
                        id_material: materiais[x].id_material
                    }
                });

                const qtde_atualizada = requisicao_material.qtde_atendida + requisicaoAtenderDto.materiais[0].qtde;

                requisicao_material.qtde_atendida = qtde_atualizada >= requisicao_material.qtde ? requisicao_material.qtde : qtde_atualizada

                await requisicao_material.save()
            }
        else {
            const requisicao_material = await getRepository(Requisicao_material).find({
                where:
                {
                    requisicao: requisicao
                }
            });

            for (let x = 0; x < requisicao_material.length; x++) {
                requisicao_material[x].qtde_atendida = requisicao_material[x].qtde;
                await requisicao_material[x].save();
            }

        }


        return await this.findOne({ relations: ['requisicao_material'] })
    }
}