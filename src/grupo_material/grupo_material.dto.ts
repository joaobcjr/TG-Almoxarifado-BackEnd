import { IsNotEmpty, IsInt, IsOptional, IsByteLength } from 'class-validator'

export class InsertGrupoDto {

    @IsNotEmpty()
    @IsByteLength(0, 60)
    descricao: string;
}

export class GetGrupoDto {

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 60)
    descricao: string;
}

export class UpdateGrupoDto {

    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsByteLength(0, 60)
    descricao: string;
}