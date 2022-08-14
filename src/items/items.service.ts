import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from "src/entities/item.entity";
import { ItemRepository } from './item.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemStatus } from './item.status.snum';
import { User } from '@sentry/node';

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

    async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
        return await this.itemRepository.createItem(createItemDto, user);
    }


    async updateStatus(id: string, user: User): Promise<Item> {
        const item = await this.findById(id);

        if (item.userId === user.id) {
            throw new BadRequestException('自身の商品を売り切れにすることはできません');
        }
        item.status = ItemStatus.SOLD_OUT;
        item.updatedAt = new Date().toISOString();
        await this.itemRepository.itemRepository.save(item);
        return item;
    }


    async deleteById(id: string, user: User): Promise<void> {
        const item = await this.findById(id);

        if (item.userId !== user.id) {
            throw new BadRequestException('他人の商品を削除することはできません');
        }
        await this.itemRepository.itemRepository.delete(id);
    }
}

