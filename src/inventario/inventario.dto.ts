import { IsNotEmpty, IsInt, IsArray, IsOptional, IsIn } from 'class-validator'
import { Status } from './inventario.entity'

export class InsertInventarioDto {

    @IsNotEmpty()
    @IsInt()
    id_funcionario: number;

    @IsArray()
    materiais: MaterialInsert[];
}

export class GetInventarioDto {

    @IsOptional()
    @IsNotEmpty()
    data: Date;

    @IsOptional()
    @IsNotEmpty()
    @IsIn([Status.Aberto, Status.Em_Andamento, Status.Fechado])
    status: Status
}


export class InventarioStatusDto {

    @IsOptional()
    @IsNotEmpty()
    @IsIn([Status.Aberto, Status.Em_Andamento, Status.Fechado])
    status: Status
}

export class MaterialInsert {

    @IsNotEmpty()
    @IsInt()
    id_material: number;

    @IsNotEmpty()
    @IsInt()
    qtde: number;
}
