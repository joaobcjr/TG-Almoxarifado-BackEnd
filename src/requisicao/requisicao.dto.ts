import { IsNotEmpty, IsInt, IsArray, IsOptional } from 'class-validator'

export class InsertRequisicaoDto {

    @IsNotEmpty()
    @IsInt()
    id_funcionario: number;

    @IsArray()
    materiais: MaterialInsert[];
}

export class GetRequisicaoDto {

    @IsOptional()
    @IsNotEmpty()
    data: Date;
}


export class RequisicaoAtenderDto {

    @IsOptional()
    @IsNotEmpty()
    @IsArray()
    materiais: MaterialInsert[]
}

export class MaterialInsert {

    @IsNotEmpty()
    @IsInt()
    id_material: number;

    @IsNotEmpty()
    @IsInt()
    qtde: number;
}
