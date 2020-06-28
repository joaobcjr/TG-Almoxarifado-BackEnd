import {
  IsNotEmpty,
  IsInt,
  IsArray,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class InsertSolicitacaoDto {
  @IsNotEmpty()
  @IsInt()
  id_funcionario: number;

  @IsArray()
  materiais: MaterialInsert[];
}

export class GetSolicitacaoDto {
  @IsOptional()
  @IsNotEmpty()
  data: Date;
}

export class MaterialInsert {
  @IsNotEmpty()
  @IsInt()
  id_material: number;

  @IsNotEmpty()
  @IsInt()
  qtde: number;
}

export class SolicitacaoVisualizarDto {
  @IsNotEmpty()
  @IsBoolean()
  visualizado: boolean;
}
