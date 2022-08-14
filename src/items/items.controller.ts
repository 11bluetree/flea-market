import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from "src/entities/item.entity";
import { CreateItemDto } from './dto/create-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '@sentry/node';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { Role } from '../auth/decorator/role.decorator';
import { UserStatus } from '../auth/user-status.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor)
export class ItemsController {
    constructor(private readonly itemService: ItemsService) { }
    @Get()
    async findAll(): Promise<Item[]> {
        return await this.itemService.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return await this.itemService.findById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Role(UserStatus.PREMIUM)
    async create(
        @Body() createItemDto: CreateItemDto,
        @GetUser() user: User,
    ): Promise<Item> {
        return await this.itemService.create(createItemDto, user);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateStatus(
        @GetUser() user: User,
        @Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return this.itemService.updateStatus(id, user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(
        @GetUser() user: User,
        @Param('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.itemService.deleteById(id,user);
    }
}
