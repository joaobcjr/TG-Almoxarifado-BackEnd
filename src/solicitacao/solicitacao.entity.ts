import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Funcionario } from 'src/funcionario/funcionario.entity';
import { Solicitacao_material } from './solicitacao_material/solicitacao_material.entity';
import { Transform } from 'class-transformer';

@Entity()
export class Solicitacao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_solicitacao: number;

  @Transform(data => data.format('DD/MM/YY'))
  @CreateDateColumn()
  data: Date;

  @Column({ select: false })
  id_funcionario: number;
  @ManyToOne(
    () => Funcionario,
    funcionario => funcionario.id_funcionario,
    {
      cascade: true,
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'id_funcionario',
  })
  funcionario: Funcionario;

  @OneToMany(
    () => Solicitacao_material,
    solicitacao_material => solicitacao_material.solicitacao,
  )
  solicitacao_material: Solicitacao_material[];
}
