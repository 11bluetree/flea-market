import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './item.model';
import { ItemStatus } from './item.status.snum';
import { v4 as uuid} from 'uuid';

@Injectable()
export class ItemsService {
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

    create(createItemDto: CreateItemDto): Item {
        const item: Item = {
            id: uuid(),
            ...createItemDto,
            status: ItemStatus.ON_SALE
        }
        this.items.push(item);
        return item;
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
