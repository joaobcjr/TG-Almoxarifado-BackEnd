import { Controller, Get, Param, Body, ValidationPipe, Query, Post, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { GetLocalDto, InsertLocalDto, UpdateLocalDto } from './Local.dto';
import { LocalService } from './local.service';
import { Local } from './local.entity';

@Controller('local')

export class LocalController {
    constructor(
        private localService: LocalService
    ) { }

    @Get('/:id')
    getLocalByID(@Param('id', ParseIntPipe) id: number): Promise<Local> {
        return this.localService.getLocalById(id);
    }

    @Get()
    getLocal(@Query(ValidationPipe) getLocalDto: GetLocalDto): Promise<Local[]> {
        return this.localService.getLocal(getLocalDto);
    }

    @Post()
    async insertLocal(@Body(ValidationPipe) insertLocalDto: InsertLocalDto): Promise<Local> {
        return this.localService.insertLocal(insertLocalDto);
    }

    @Patch()
    async patchLocal(@Body() updateLocalDto: UpdateLocalDto): Promise<Local> {
        return await this.localService.updateLocal(updateLocalDto)
    }

    @Delete(':id')
    deleteLocal(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.localService.deleteLocal(id)
    }


}
