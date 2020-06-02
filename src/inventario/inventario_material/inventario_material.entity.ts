/* eslint-disable @typescript-eslint/class-name-casing */
import { BaseEntity, Entity, ManyToOne, JoinColumn, PrimaryColumn, Column } from 'typeorm'
import { Inventario } from '../inventario.entity';
import { Material } from 'src/material/material.entity';

@Entity()
export class Inventario_material extends BaseEntity {

    @PrimaryColumn()
    id_inventario: number;
    @ManyToOne(() => Inventario, inventario => inventario.id_inventario,
        {
            cascade: true,
            nullable: false
        })
    @JoinColumn({
        name: "id_inventario"
    })
    inventario: Inventario;

    @PrimaryColumn()
    id_material: number;
    @ManyToOne(() => Material, material => material.id_material,
        {
            cascade: true,
            nullable: false
        })
    @JoinColumn({
        name: "id_material"
    })
    material: Material;

    @Column()
    qtde: number;

}