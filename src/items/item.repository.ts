import { User } from "@sentry/node";
import { AppDataSource } from "../data-source";
import { Item } from "../entities/item.entity";
import { Repository } from "typeorm";
import { CreateItemDto } from "./dto/create-item.dto";
import { ItemStatus } from "./item.status.snum";

export class ItemRepository {
    readonly itemRepository: Repository<Item> = AppDataSource.getRepository(Item);

    async createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
        const { name, price, description } = createItemDto
        const item = this.itemRepository.create({
            name,
            price,
            description,
            status: ItemStatus.ON_SALE,
            createAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user,
        });
        await this.itemRepository.save(item);

        return item;

    }
}