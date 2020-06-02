import { IsNotEmpty, IsOptional, IsInt, IsByteLength } from 'class-validator'

export class InsertDepartamentoDto {

    @IsNotEmpty()
    @IsByteLength(0, 20)
    descricao: string;
}

export class GetDepartamentoDto {

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 20)
    descricao: string;

}

export class UpdateDepartamentoDto {

    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 20)
    descricao: string;
}