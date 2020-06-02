import { IsNotEmpty, IsOptional, IsInt, IsByteLength } from 'class-validator'

export class InsertUnMedidaDto {

    @IsNotEmpty()
    @IsByteLength(2, 2)
    id: string;

    @IsNotEmpty()
    @IsByteLength(0, 10)
    descricao: string;
}

export class GetUnMedidaDto {

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(2, 2)
    id: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 10)
    descricao: string;
}

export class UpdateUnMedidaDto {

    @IsNotEmpty()
    @IsByteLength(2, 2)
    id: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 10)
    descricao: string;
}