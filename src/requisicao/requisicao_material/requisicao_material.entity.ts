/* eslint-disable @typescript-eslint/class-name-casing */
import { BaseEntity, Entity, ManyToOne, JoinColumn, PrimaryColumn, Column } from 'typeorm'
import { Requisicao } from '../requisicao.entity';
import { Material } from 'src/material/material.entity';

@Entity()
export class Requisicao_material extends BaseEntity {

    @PrimaryColumn()
    id_requisicao: number;
    @ManyToOne(() => Requisicao, requisicao => requisicao.id_requisicao,
        {
            cascade: true,
            nullable: false
        })
    @JoinColumn({
        name: "id_requisicao"
    })
    requisicao: Requisicao;

    @PrimaryColumn()
    id_material: number;
    @ManyToOne(() => Material, material => material.id_material,
        {
            cascade: true,
            nullable: false
        })
    @JoinColumn({
        name: "id_material"
    })
    material: Material;

    @Column()
    qtde: number;

    @Column()
    qtde_atendida: number;

}