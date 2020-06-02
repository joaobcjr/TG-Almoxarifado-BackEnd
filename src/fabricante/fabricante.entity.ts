import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Fabricante extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_fabricante: number;

    @Column({ unique: true, length: 14 })
    cnpj: string;

    @Column({ length: 60 })
    razao_social: string;

    @Column({ length: 60 })
    nome_fantasia: string;

    @Column({ length: 60 })
    endereco: string;

    @Column({ length: 3 })
    ddd: string;

    @Column({ length: 9 })
    telefone: string;
}