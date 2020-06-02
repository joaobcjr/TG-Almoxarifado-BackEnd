import { Controller, Get, Param, Body, ValidationPipe, Query, Post, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { GetFabricanteDto, InsertFabricanteDto, UpdateFabricanteDto } from './Fabricante.dto';
import { FabricanteService } from './fabricante.service';
import { Fabricante } from './fabricante.entity';

@Controller('fabricante')

export class FabricanteController {
    constructor(
        private fabricanteService: FabricanteService
    ) { }

    @Get('/:id')
    getFabricanteByID(@Param('id', ParseIntPipe) id: number): Promise<Fabricante> {
        return this.fabricanteService.getFabricanteById(id);
    }

    @Get()
    getFabricante(@Query(ValidationPipe) getFabricanteDto: GetFabricanteDto): Promise<Fabricante[]> {
        return this.fabricanteService.getFabricante(getFabricanteDto);
    }

    @Post()
    async insertFabricante(@Body(ValidationPipe) insertFabricanteDto: InsertFabricanteDto): Promise<Fabricante> {
        return this.fabricanteService.insertFabricante(insertFabricanteDto);
    }

    @Patch()
    async patchFabricante(@Body() updateFabricanteDto: UpdateFabricanteDto): Promise<Fabricante> {
        return await this.fabricanteService.updateFabricante(updateFabricanteDto)
    }

    @Delete(':id')
    deleteFabricante(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.fabricanteService.deleteFabricante(id)
    }


}
