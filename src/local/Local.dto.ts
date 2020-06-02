import { IsNotEmpty, IsOptional, IsInt, IsByteLength } from 'class-validator'

export class InsertLocalDto {

    @IsNotEmpty()
    @IsByteLength(0, 10)
    corredor: string;

    @IsByteLength(0, 10)
    @IsNotEmpty()
    prateleira: string;
}

export class GetLocalDto {

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 10)
    corredor: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 10)
    prateleira: string;
}

export class UpdateLocalDto {

    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 10)
    corredor: string;

    @IsOptional()
    @IsNotEmpty()
    @IsByteLength(0, 10)
    prateleira: string;
}