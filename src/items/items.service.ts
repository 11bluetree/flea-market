import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from "src/entities/item.entity";
import { ItemStatus } from './item.status.snum';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemsService {
    constructor(private readonly itemRepositpry: ItemRepository){}
    private items: Item[] = [];

    findAll(): Item[] {
        return this.items;
    }

    findById(id: string): Item {
        const found = this.items.find((item) => item.id === id);
        if (!found){
            throw new NotFoundException();
        }
        return this.items.find((item) => item.id === id);
    }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        return await this.itemRepositpry.createItem(createItemDto);
    }
    updateStatus(id: string): Item {
        const item = this.findById(id);
        item.status = ItemStatus.SOLD_OUT
        return item;
    }
    deleteById(id: string): void {
        this.items = this.items.filter((item) => item.id !== id)
    }
}

