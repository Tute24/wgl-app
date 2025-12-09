import { describe, it, expect, vi, Mock } from 'vitest';
import { prisma } from '../../../lib/prisma';
import { createGiftService } from '../gifts.service';
import { mockUser } from '../../__mocks__/mockUser';
import { mockWedding } from '../../__mocks__/mockWedding';
import { mockGift } from '../../__mocks__/mockGift';

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: { findUnique: vi.fn() },
    weddings: { findUnique: vi.fn() },
    gifts: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
  },
}));

const mockUsersFindUnique = prisma.users.findUnique as Mock;
const mockWeddingsFindUnique = prisma.weddings.findUnique as Mock;
const mockGiftsFindMany = prisma.gifts.findMany as Mock;
const mockGiftsCreate = prisma.gifts.create as Mock;

describe('createGiftService', () => {
  const newGiftsArray = [
    {
      productName: 'New Gift',
      productLink: 'www.gift.com',
      quantity: 2,
    },
    {
      productName: 'Another Gift',
      productLink: 'www.gift2.com',
      quantity: 1,
    },
  ];

  it('should create gifts successfully', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser);
    mockWeddingsFindUnique.mockResolvedValue(mockWedding);
    mockGiftsFindMany.mockResolvedValueOnce([]).mockResolvedValueOnce([mockGift]);

    mockGiftsCreate.mockResolvedValue({});

    const response = await createGiftService(mockUser.id, mockWedding.id, newGiftsArray);

    expect(response.message).toBe('Gifts created successfully');
    expect(mockUsersFindUnique).toHaveBeenCalled();
    expect(mockWeddingsFindUnique).toHaveBeenCalled();
    expect(mockGiftsFindMany).toHaveBeenCalledTimes(2);
    expect(mockGiftsCreate).toHaveBeenCalledTimes(newGiftsArray.length);
  });

  it('should throw 404 if user is not found', async () => {
    mockUsersFindUnique.mockResolvedValue(null);

    await expect(
      createGiftService(mockUser.id, mockWedding.id, newGiftsArray),
    ).rejects.toMatchObject({
      message: "Couldn't find the user on the database.",
      status: 404,
    });
  });

  it('should throw 404 if wedding is not found', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser);
    mockWeddingsFindUnique.mockResolvedValue(null);

    await expect(
      createGiftService(mockUser.id, mockWedding.id, newGiftsArray),
    ).rejects.toMatchObject({
      message: "Couldn't find the wedding on the database.",
      status: 404,
    });
  });

  it('should throw 409 when submitting gifts with conflicting names', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser);
    mockWeddingsFindUnique.mockResolvedValue(mockWedding);

    mockGiftsFindMany.mockResolvedValue([{ productName: 'New Gift' }]);

    await expect(
      createGiftService(mockUser.id, mockWedding.id, newGiftsArray),
    ).rejects.toMatchObject({
      message: "Conflict - Gifts with the same name as existent ones can't be submitted.",
      status: 409,
    });
  });
});
