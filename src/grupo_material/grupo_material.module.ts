import { Module } from '@nestjs/common';
import { GrupoController } from './grupo_material.controller';
import { GrupoService } from './grupo_material.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoRepository } from './grupo_material.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GrupoRepository
    ])
  ],
  controllers: [GrupoController],
  providers: [GrupoService]
})
export class GrupoModule { }
