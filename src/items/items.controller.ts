import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from "src/entities/item.entity";
import { CreateItemDto } from './dto/create-item.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '@sentry/node';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

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
    @UseGuards(JwtAuthGuard)
    async create(
        @Body() createItemDto: CreateItemDto,
        @GetUser() user: User,
    ): Promise<Item> {
        console.log(user);
        
        return await this.itemService.create(createItemDto);
    }

    @Patch(':id')
    async updateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return this.itemService.updateStatus(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.itemService.deleteById(id);
    }
}
