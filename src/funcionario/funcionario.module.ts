import { Module } from '@nestjs/common';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioService } from './funcionario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionarioRepository } from './funcionario.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FuncionarioRepository
    ])
  ],
  controllers: [FuncionarioController],
  providers: [FuncionarioService]
})
export class FuncionarioModule { }
