import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Fabricante } from 'src/fabricante/fabricante.entity';
import { Un_Medida } from 'src/un_medida/un_medida.entity';
import { Local } from 'src/local/local.entity';
import { Grupo_Material } from 'src/grupo_material/grupo_material.entity';

@Entity()
export class Material extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_material: number;

    @Column({ unique: true, length: 13 })
    cod_barra: string;

    @Column({ length: 60 })
    descricao: string;

    @Column()
    id_un_medida: string;
    @ManyToOne(() => Un_Medida, unMedida => unMedida.id_un_medida,
        {
            cascade: true,
            nullable: false
        })
    @JoinColumn({
        name: "id_un_medida"
    })
    un_medida: Un_Medida;

    @Column("decimal", { precision: 6, scale: 2 })
    custo: number;

    @Column()
    estoque_atual: number;

    @Column()
    estoque_minimo: number;

    @Column()
    id_fabricante: number;
    @ManyToOne(() => Fabricante, fabricante => fabricante.id_fabricante,
        {
            cascade: true,
            nullable: false
        })
    @JoinColumn({
        name: "id_fabricante"
    })
    fabricante: Fabricante;

    @Column()
    id_local: number
    @ManyToOne(() => Local, local => local.id_local,
        {
            cascade: true,
            nullable: false
        })
    @JoinColumn({
        name: "id_local"
    })
    local: Local;

    @Column()
    id_grupo_material: number
    @ManyToOne(() => Grupo_Material, grupoMaterial => grupoMaterial.id_grupo_material,
        {
            cascade: true,
            nullable: false
        })
    @JoinColumn({
        name: "id_grupo_material"
    })
    grupo_material: Grupo_Material;

}