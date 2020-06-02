/* eslint-disable @typescript-eslint/class-name-casing */
import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Un_Medida extends BaseEntity {
    @PrimaryColumn({ length: 2 })
    id_un_medida: string;

    @Column({ length: 10 })
    descricao: string;

}