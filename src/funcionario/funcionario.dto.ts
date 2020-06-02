import { IsNotEmpty, IsOptional, IsInt, IsByteLength, NotContains } from 'class-validator'

export class InsertFuncionarioDto {

    @IsNotEmpty()
    @IsByteLength(0, 20)
    nome: string;

    @IsByteLength(6, 20)
    @IsNotEmpty()
    senha: string;

    @IsNotEmpty()
    @IsInt()
    id_departamento: number;
}

export class GetFuncionarioDto {

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 20)
    nome: string;

    @IsOptional()
    @IsByteLength(6, 20)
    @IsNotEmpty()
    senha: string;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    id_departamento: number;
}

export class UpdateFuncionarioDto {

    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 20)
    nome: string;

    @IsOptional()
    @IsByteLength(6, 20)
    @IsNotEmpty()
    senha: string;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    id_departamento: number;
}