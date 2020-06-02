import { Controller, Get, Param, Body, ValidationPipe, Query, Post, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { GetFuncionarioDto, InsertFuncionarioDto, UpdateFuncionarioDto } from './Funcionario.dto';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from './funcionario.entity';

@Controller('funcionario')

export class FuncionarioController {
    constructor(
        private funcionarioService: FuncionarioService
    ) { }

    @Get('/:id')
    getFuncionarioByID(@Param('id', ParseIntPipe) id: number): Promise<Funcionario> {
        return this.funcionarioService.getFuncionarioById(id);
    }

    @Get()
    getFuncionario(@Query(ValidationPipe) getFuncionarioDto: GetFuncionarioDto): Promise<Funcionario[]> {
        return this.funcionarioService.getFuncionario(getFuncionarioDto);
    }

    @Post()
    async insertFuncionario(@Body(ValidationPipe) insertFuncionarioDto: InsertFuncionarioDto): Promise<Funcionario> {
        return this.funcionarioService.insertFuncionario(insertFuncionarioDto);
    }

    @Patch()
    async patchFuncionario(@Body() updateFuncionarioDto: UpdateFuncionarioDto): Promise<Funcionario> {
        return await this.funcionarioService.updateFuncionario(updateFuncionarioDto)
    }

    @Delete(':id')
    deleteFuncionario(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.funcionarioService.deleteFuncionario(id)
    }


}
