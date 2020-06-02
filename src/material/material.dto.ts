import { IsNotEmpty, IsOptional, IsByteLength, IsPositive, IsNumber, IsInt } from 'class-validator'

export class InsertMaterialDto {

    @IsNotEmpty()
    @IsByteLength(13, 13)
    cod_barra: string;

    @IsNotEmpty()
    @IsByteLength(0, 60)
    descricao: string;

    @IsNotEmpty()
    @IsByteLength(2, 2)
    id_un_medida: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    custo: number;

    @IsNotEmpty()
    @IsNumber()
    estoque_atual: number;

    @IsNotEmpty()
    @IsNumber()
    estoque_minimo: number;

    @IsNotEmpty()
    @IsInt()
    id_fabricante: number;

    @IsNotEmpty()
    @IsInt()
    id_local: number;

    @IsNotEmpty()
    @IsInt()
    id_grupo_material: number;

}

export class GetMaterialDto {

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(13, 13)
    cod_barra: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 60)
    descricao: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    estoque_atual: number;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    id_fabricante: number;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    id_local: number;

}

export class UpdateMaterialDto {

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(13, 13)
    cod_barra: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 60)
    descricao: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(2, 2)
    id_un_medida: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    custo: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    estoque_atual: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    estoque_minimo: number;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    id_fabricante: number;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    id_local: number;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    id_grupo_material: number;
}