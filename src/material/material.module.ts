import { Module } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialRepository } from './material.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MaterialRepository
    ])
  ],
  controllers: [MaterialController],
  providers: [MaterialService]
})
export class MaterialModule { }
