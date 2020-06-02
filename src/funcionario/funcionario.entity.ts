import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Departamento } from 'src/departamento/departamento.entity';

@Entity()
export class Funcionario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_funcionario: number;

    @Column({ length: 20 })
    nome: string;

    @Column({ length: 20 })
    senha: string;

    @Column()
    id_departamento: number;
    @ManyToOne(() => Departamento, departamento => departamento.id_departamento,
        {
            cascade: true,
            nullable: false
        })
    @JoinColumn({
        name: "id_departamento"
    })
    departamento: Departamento;

}