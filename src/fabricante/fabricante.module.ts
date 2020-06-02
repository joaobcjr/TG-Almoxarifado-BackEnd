import { Module } from '@nestjs/common';
import { FabricanteController } from './fabricante.controller';
import { FabricanteService } from './fabricante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FabricanteRepository } from './fabricante.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FabricanteRepository
    ])
  ],
  controllers: [FabricanteController],
  providers: [FabricanteService]
})
export class FabricanteModule { }
