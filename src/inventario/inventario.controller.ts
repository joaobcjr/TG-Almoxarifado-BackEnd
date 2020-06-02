import { Controller, Get, Body, ValidationPipe, Post, Patch, Param, ParseIntPipe, Query } from '@nestjs/common';
import { InsertInventarioDto, GetInventarioDto, InventarioStatusDto } from './inventario.dto';
import { InventarioService } from './inventario.service'
import { Inventario } from './inventario.entity';

@Controller('inventario')

export class InventarioController {
    constructor(
        private inventarioService: InventarioService
    ) { }

    @Get('/:id')
    getInventarioByID(@Param('id', ParseIntPipe) id: number): Promise<Inventario> {
        return this.inventarioService.getInventarioById(id);
    }

    @Get()
    getInventario(@Query(ValidationPipe) getInventarioDto: GetInventarioDto): Promise<Inventario[]> {
        return this.inventarioService.getInventario(getInventarioDto);
    }

    @Post()
    async insertInventario(@Body(ValidationPipe) insertInventarioDto: InsertInventarioDto): Promise<Inventario> {
        return this.inventarioService.insertInventario(insertInventarioDto);
    }

    @Patch('/status/:id')
    async patchInventario(
        @Param('id', ParseIntPipe) id: number,
        @Body() inventarioStatusDto: InventarioStatusDto
    ): Promise<Inventario> {
        return await this.inventarioService.updateStatus(id, inventarioStatusDto)
    }

}
