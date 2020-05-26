import { IsNotEmpty, IsOptional, IsInt } from 'class-validator'
import { ParseIntPipe } from '@nestjs/common';

export class InsertLocalDto {

    @IsNotEmpty()
    corredor: string;

    @IsNotEmpty()
    prateleira: string;
}

export class GetLocalDto {

    @IsOptional()
    @IsNotEmpty()
    corredor: string;

    @IsOptional()
    @IsNotEmpty()
    prateleira: string;
}

export class UpdateLocalDto {

    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsOptional()
    @IsNotEmpty()
    corredor: string;

    @IsOptional()
    @IsNotEmpty()
    prateleira: string;
}