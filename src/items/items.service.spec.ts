import { Test } from '@nestjs/testing'
import { ItemRepository } from './item.repository';
import { ItemsService } from './items.service'

const mockItemRepository = () => ({});

describe('ItemsServiceTest', () => {
    let itemsService;
    let itemRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ItemsService,
                {
                    provide: ItemRepository,
                    useFactory: mockItemRepository,
                },
            ],
        }).compile();

        itemsService = module.get<ItemsService>(itemsService);
        itemRepository = module.get<ItemRepository>(itemRepository);
    })
})