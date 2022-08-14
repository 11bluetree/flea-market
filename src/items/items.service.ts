import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from "src/entities/item.entity";
import { ItemRepository } from './item.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemStatus } from './item.status.snum';

@Injectable()
export class ItemsService {
    constructor(
        private readonly itemRepository: ItemRepository) { }

    async findAll(): Promise<Item[]> {
        return await this.itemRepository.itemRepository.find();
    }

    async findById(id: string): Promise<Item> {
        const found = await this.itemRepository.itemRepository.findOne({
            where: {
                id
            }
        })
        if (!found) {
            throw new NotFoundException();
        }
        return found;
    }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        return await this.itemRepository.createItem(createItemDto);
    }


    async updateStatus(id: string): Promise<Item> {
        const item = await this.findById(id);
        item.status = ItemStatus.SOLD_OUT;
        item.updatedAt = new Date().toISOString();
        await this.itemRepository.itemRepository.save(item);
        return item;
    }


    async deleteById(id: string): Promise<void> {
        await this.itemRepository.itemRepository.delete(id);
    }
}

