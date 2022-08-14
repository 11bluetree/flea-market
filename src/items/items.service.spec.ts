import { Test } from '@nestjs/testing'
import { ItemRepository } from './item.repository';
import { ItemsService } from './items.service'
import { jest } from '@jest/globals';
import { UserStatus } from '../auth/user-status.enum';
import { ItemStatus } from './item.status.snum';
import { NotFoundException } from '@nestjs/common';

const mockItemRepository = () => ({
    itemRepository: {
        find: jest.fn(), // モック関数
        findOne: jest.fn(),
    }
}
);

const mockUser1 = {
    id: 1,
    username: 'test1',
    password: 'test1234',
    status: UserStatus.PREMIUM,
}

const mockUser2 = {
    id: 1,
    username: 'test2',
    password: 'test1234',
    status: UserStatus.FREE,
}

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

    describe('find by id', () => {
        it('正常系', async () => {
            const expected = {
                id: 'test-id',
                name: 'PC',
                price: 50000,
                description: '',
                status: ItemStatus.ON_SALE,
                createdAt: '',
                updatedAt: '',
                userId: mockUser1.id,
                user: mockUser1,
            }

            itemRepository.itemRepository.findOne.mockResolvedValue(expected);
            const result = await itemsService.findById('test-id');
            expect(result).toEqual(expected);
        });
        it('異常系　商品がない場合', async () => {
            const expected = {
                id: 'test-id',
                name: 'PC',
                price: 50000,
                description: '',
                status: ItemStatus.ON_SALE,
                createdAt: '',
                updatedAt: '',
                userId: mockUser1.id,
                user: mockUser1,
            }

            itemRepository.itemRepository.findOne.mockResolvedValue(null);
            await expect(itemsService.findById('test-id')).rejects.toThrow(NotFoundException)
        })
    })
})