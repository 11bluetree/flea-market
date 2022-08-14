import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from "src/entities/item.entity";
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemService: ItemsService) { }
    @Get()
    async findAll(): Promise<Item[]> {
        return await  this.itemService.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return await this.itemService.findById(id);
    }

    @Post()
    async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
        return await this.itemService.create(createItemDto);
    }

/*     @Patch(':id')
    updateStatus(@Param('id', ParseUUIDPipe) id: string): Item {
        return this.itemService.updateStatus(id);
    } */

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id: string): void {
        this.itemService.deleteById(id);
    }
}
