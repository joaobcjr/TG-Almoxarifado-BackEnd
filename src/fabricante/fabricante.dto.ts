import { IsNotEmpty, IsOptional, IsInt, Max, IsByteLength, Validate } from 'class-validator'
import { ValidateCnpj } from './pipes/validate-cnpj.pipe'

export class InsertFabricanteDto {

    @IsNotEmpty()
    @IsByteLength(14, 14)
    @Validate(ValidateCnpj)
    cnpj: string;

    @IsNotEmpty()
    @IsByteLength(0, 60)
    razao_social: string;

    @IsNotEmpty()
    @IsByteLength(0, 60)
    nome_fantasia: string;

    @IsNotEmpty()
    @IsByteLength(0, 60)
    endereco: string;

    @IsNotEmpty()
    @IsByteLength(3, 3)
    ddd: string;

    @IsNotEmpty()
    @IsByteLength(8, 9)
    telefone: string;
}

export class GetFabricanteDto {

    @IsOptional()
    @IsByteLength(14, 14)
    @Validate(ValidateCnpj)
    cnpj: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 60)
    razao_social: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 60)
    nome_fantasia: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 60)
    endereco: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(3, 3)
    ddd: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(8, 9)
    telefone: string;
}

export class UpdateFabricanteDto {

    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 60)
    razao_social: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 60)
    nome_fantasia: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 60)
    endereco: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(3, 3)
    ddd: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(8, 9)
    telefone: string;
}