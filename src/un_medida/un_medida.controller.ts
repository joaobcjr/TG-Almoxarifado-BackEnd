import { Controller, Get, Param, Body, ValidationPipe, Query, Post, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { GetUnMedidaDto, InsertUnMedidaDto, UpdateUnMedidaDto } from './un_medida.dto';
import { UnMedidaService } from './un_medida.service';
import { Un_Medida } from './un_medida.entity';

@Controller('un_medida')

export class UnMedidaController {
    constructor(
        private unMedidaService: UnMedidaService
    ) { }

    @Get('/:id')
    getUnMedidaByID(@Param('id') id: string): Promise<Un_Medida> {
        return this.unMedidaService.getUnMedidaById(id);
    }

    @Get()
    getUnMedida(@Query(ValidationPipe) getUnMedidaDto: GetUnMedidaDto): Promise<Un_Medida[]> {
        return this.unMedidaService.getUnMedida(getUnMedidaDto);
    }

    @Post()
    async insertUnMedida(@Body(ValidationPipe) insertUnMedidaDto: InsertUnMedidaDto): Promise<Un_Medida> {
        return this.unMedidaService.insertUnMedida(insertUnMedidaDto);
    }

    @Patch()
    async patchUnMedida(@Body() updateUnMedidaDto: UpdateUnMedidaDto): Promise<Un_Medida> {
        return await this.unMedidaService.updateUnMedida(updateUnMedidaDto)
    }

    @Delete(':id')
    deleteUnMedida(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.unMedidaService.deleteUnMedida(id)
    }


}
