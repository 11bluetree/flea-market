import { Test } from '@nestjs/testing'
import { ItemRepository } from './item.repository';
import { ItemsService } from './items.service'
import { jest } from '@jest/globals';

const mockItemRepository = () => ({
    itemRepository: {
        find: jest.fn(), // モック関数
    }
}
);

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

        itemsService = module.get<ItemsService>(ItemsService);
        itemRepository = module.get<ItemRepository>(ItemRepository);
    });

    describe('findAll', () => {
        it('正常系', async () => {
            const expected = [];
            itemRepository.itemRepository.find.mockResolvedValue(expected);
            const result = await itemsService.findAll();

            expect(result).toEqual(expected);
        })
    })
})