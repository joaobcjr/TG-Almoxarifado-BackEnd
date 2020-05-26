import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Local extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_local: number;

    @Column()
    corredor: string;

    @Column()
    prateleira: string;

}