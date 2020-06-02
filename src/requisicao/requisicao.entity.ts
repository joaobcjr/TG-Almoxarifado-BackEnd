import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm'
import { Funcionario } from 'src/funcionario/funcionario.entity';
import { Requisicao_material } from './requisicao_material/requisicao_material.entity';
import { Transform } from 'class-transformer';

@Entity()
export class Requisicao extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_requisicao: number;

    @Transform(data => (data).format('DD/MM/YY'))
    @CreateDateColumn()
    data: Date;

    @Column()
    id_funcionario: number;
    @ManyToOne(() => Funcionario, funcionario => funcionario.id_funcionario,
        {
            cascade: true,
            nullable: false
        })
    @JoinColumn({
        name: "id_funcionario"
    })
    funcionario: Funcionario;

    @OneToMany(() => Requisicao_material, requisicao_material => requisicao_material.requisicao)
    requisicao_material: Requisicao_material[];

}