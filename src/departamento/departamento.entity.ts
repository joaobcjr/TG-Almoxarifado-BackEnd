import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Departamento extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_departamento: number;

    @Column({ length: 20 })
    descricao: string;

}