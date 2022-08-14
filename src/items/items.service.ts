import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from "src/entities/item.entity";
import { ItemRepository } from './item.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
    constructor(
        private readonly itemRepository: ItemRepository) { }
    private items: Item[] = [];

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
    // async updateStatus(id: string): void {
    //     await const item = this.findById(id);
    //     item.status = ItemStatus.SOLD_OUT
    //     return item;
    // }
    deleteById(id: string): void {
         this.items = this.items.filter((item) => item.id !== id)
    }
}

