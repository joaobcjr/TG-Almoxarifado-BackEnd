
import { Module } from '@nestjs/common';
import { InventarioController } from './inventario.controller';
import { InventarioService } from './inventario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioRepository } from './inventario.repository';
import { MaterialService } from 'src/material/material.service';
import { MaterialRepository } from 'src/material/material.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InventarioRepository,
      MaterialRepository
    ])
  ],
  controllers: [InventarioController],
  providers: [InventarioService, MaterialService]
})
export class InventarioModule { }
