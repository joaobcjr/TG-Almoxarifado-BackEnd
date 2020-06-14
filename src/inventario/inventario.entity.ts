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
import { Inventario_material } from './inventario_material/inventario_material.entity';
import { Transform } from 'class-transformer';

export enum Status {
  Aberto = 'Aberto',
  Em_Andamento = 'Em_Andamento',
  Fechado = 'Fechado',
}

@Entity()
export class Inventario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_inventario: number;

  @Transform(data => data.format('DD/MM/YY'))
  @CreateDateColumn()
  data: Date;

  @Column()
  status: Status;

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
    () => Inventario_material,
    inventario_material => inventario_material.inventario,
  )
  inventario_material: Inventario_material[];
}
