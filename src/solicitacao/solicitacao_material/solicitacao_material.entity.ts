/* eslint-disable @typescript-eslint/class-name-casing */
import {
  BaseEntity,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Column,
} from 'typeorm';
import { Solicitacao } from '../solicitacao.entity';
import { Material } from 'src/material/material.entity';

@Entity()
export class Solicitacao_material extends BaseEntity {
  @PrimaryColumn()
  id_solicitacao: number;
  @ManyToOne(
    () => Solicitacao,
    solicitacao => solicitacao.id_solicitacao,
    {
      cascade: true,
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'id_solicitacao',
  })
  solicitacao: Solicitacao;

  @PrimaryColumn()
  id_material: number;
  @ManyToOne(
    () => Material,
    material => material.id_material,
    {
      cascade: true,
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'id_material',
  })
  material: Material;

  @Column()
  qtde: number;
}
