import { Controller, Get, Param, Body, ValidationPipe, Query, Post, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { GetGrupoDto, InsertGrupoDto, UpdateGrupoDto } from './grupo_material.dto';
import { GrupoService } from './grupo_material.service';
import { Grupo_Material } from './grupo_material.entity';

@Controller('grupo_material')

export class GrupoController {
    constructor(
        private grupoService: GrupoService
    ) { }

    @Get('/:id')
    getGrupoByID(@Param('id', ParseIntPipe) id: number): Promise<Grupo_Material> {
        return this.grupoService.getGrupoById(id);
    }

    @Get()
    getGrupo(@Query(ValidationPipe) getGrupoDto: GetGrupoDto): Promise<Grupo_Material[]> {
        return this.grupoService.getGrupo(getGrupoDto);
    }

    @Post()
    async insertGrupo(@Body(ValidationPipe) insertGrupoDto: InsertGrupoDto): Promise<Grupo_Material> {
        return this.grupoService.insertGrupo(insertGrupoDto);
    }

    @Patch()
    async patchGrupo(@Body() updateGrupoDto: UpdateGrupoDto): Promise<Grupo_Material> {
        return await this.grupoService.updateGrupo(updateGrupoDto)
    }

    @Delete(':id')
    deleteGrupo(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.grupoService.deleteGrupo(id)
    }


}
