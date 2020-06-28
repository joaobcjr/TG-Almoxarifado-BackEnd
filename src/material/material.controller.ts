import {
  Controller,
  Get,
  Param,
  Body,
  ValidationPipe,
  Query,
  Post,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  GetMaterialDto,
  InsertMaterialDto,
  UpdateMaterialDto,
} from './material.dto';
import { MaterialService } from './material.service';
import { Material } from './material.entity';

@Controller('material')
export class MaterialController {
  constructor(private materialService: MaterialService) {}

  @Get('/:id')
  getMaterialByID(@Param('id', ParseIntPipe) id: number): Promise<Material> {
    return this.materialService.getMaterialById(id);
  }

  @Get()
  getMaterial(
    @Query(ValidationPipe) getMaterialDto: GetMaterialDto,
  ): Promise<Material[]> {
    return this.materialService.getMaterial(getMaterialDto);
  }

  @Post()
  async insertMaterial(
    @Body(ValidationPipe) insertMaterialDto: InsertMaterialDto,
  ): Promise<Material> {
    return this.materialService.insertMaterial(insertMaterialDto);
  }

  @Patch()
  async patchMaterial(
    @Body() updateMaterialDto: UpdateMaterialDto,
  ): Promise<Material> {
    return await this.materialService.updateMaterial(updateMaterialDto);
  }

  @Delete(':id')
  deleteMaterial(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.materialService.deleteMaterial(id);
  }
}
