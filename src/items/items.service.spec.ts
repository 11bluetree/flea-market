import { Test } from '@nestjs/testing'
import { async } from 'rxjs';
import { ItemRepository } from './item.repository';
import { ItemsService } from './items.service'

const mockItemRepository = () => ({
    find: jest.fn(), // モック関数
});

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

    describe('findAll', ()=> {
        it('正常系', async ()=> {
            const expected = [];
            itemRepository.find.mockResulvedValue(expected);
            const result = await itemsService.findAll();

            expect(result).toEqual(expected)
        })
    })
})