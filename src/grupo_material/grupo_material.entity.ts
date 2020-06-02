/* eslint-disable @typescript-eslint/class-name-casing */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Grupo_Material extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_grupo_material: number;

    @Column({ length: 60 })
    descricao: string;

}