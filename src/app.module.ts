import { Module } from '@nestjs/common';
import { LocalModule } from './local/local.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'config/typeorm.config';
import { GrupoModule } from './grupo_material/grupo_material.module';
import { FabricanteModule } from './fabricante/fabricante.module';
import { UnMedidaModule } from './un_medida/un_medida.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { MaterialModule } from './material/material.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { RequisicaoModule } from './requisicao/requisicao.module';
import { SolicitacaoModule } from './solicitacao/solicitacao.module';
import { InventarioModule } from './inventario/inventario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    DepartamentoModule,
    FabricanteModule,
    FuncionarioModule,
    GrupoModule,
    InventarioModule,
    LocalModule,
    MaterialModule,
    RequisicaoModule,
    SolicitacaoModule,
    UnMedidaModule
  ]
})
export class AppModule { }
