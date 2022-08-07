import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.model';
import { get } from 'http';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemService: ItemsService) { }
    @Get()
    findAll(): Item[] {
        return this.itemService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Item {
        return this.itemService.findById(id);
    }

    @Post()
    create(@Body() createItemDto: CreateItemDto): Item {
        return this.itemService.create(createItemDto);
    }

    @Patch(':id')
    updateStatus(@Param('id') id: string): Item {
        return this.itemService.updateStatus(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string): void {
        this.itemService.deleteById(id);
    }
}
