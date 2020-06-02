import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Local extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_local: number;

    @Column({ length: 10 })
    corredor: string;

    @Column({ length: 10 })
    prateleira: string;

}