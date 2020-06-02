import { Controller, Get, Param, Body, ValidationPipe, Query, Post, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { GetDepartamentoDto, InsertDepartamentoDto, UpdateDepartamentoDto } from './Departamento.dto';
import { DepartamentoService } from './departamento.service';
import { Departamento } from './departamento.entity';

@Controller('departamento')

export class DepartamentoController {
    constructor(
        private departamentoService: DepartamentoService
    ) { }

    @Get('/:id')
    getDepartamentoByID(@Param('id', ParseIntPipe) id: number): Promise<Departamento> {
        return this.departamentoService.getDepartamentoById(id);
    }

    @Get()
    getDepartamento(@Query(ValidationPipe) getDepartamentoDto: GetDepartamentoDto): Promise<Departamento[]> {
        return this.departamentoService.getDepartamento(getDepartamentoDto);
    }

    @Post()
    async insertDepartamento(@Body(ValidationPipe) insertDepartamentoDto: InsertDepartamentoDto): Promise<Departamento> {
        return this.departamentoService.insertDepartamento(insertDepartamentoDto);
    }

    @Patch()
    async patchDepartamento(@Body() updateDepartamentoDto: UpdateDepartamentoDto): Promise<Departamento> {
        return await this.departamentoService.updateDepartamento(updateDepartamentoDto)
    }

    @Delete(':id')
    deleteDepartamento(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.departamentoService.deleteDepartamento(id)
    }


}
