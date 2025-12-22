import { describe, it, expect, vi, type Mock } from 'vitest';
import { mockWedding } from '../../__mocks__/mockWedding';
import { prisma } from '../../../lib/prisma';
import { createWeddingService } from '../weddings.service';
import { AppError } from '../../../classes/app-error';
import { mockUser } from '../../__mocks__/mockUser';
import { mockGift } from '../../__mocks__/mockGift';

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: {
      findUnique: vi.fn(),
    },
    weddings: {
      create: vi.fn(),
    },
    gifts: {
      create: vi.fn(),
    },
  },
}));

const mockFindUser = prisma.users.findUnique as Mock;

describe('createWeddingService', () => {
  it('should create a wedding and its gifts and return message + newlyCreatedWedding', async () => {
    const mockNewWedding = {
      id: mockWedding.id,
      weddingTitle: mockWedding.weddingTitle,
      weddingDate: mockWedding.weddingDate,
      shippingAddress: mockWedding.shippingAddress,
      createdBy: mockWedding.createdBy,
    };

    const mockGiftsArray = [
      {
        quantity: mockGift.quantity,
        productName: mockGift.productName,
        productLink: mockGift.productLink,
      },
    ];

    mockFindUser.mockResolvedValue(mockUser);
    (prisma.weddings.create as Mock).mockResolvedValue(mockNewWedding);
    (prisma.gifts.create as Mock).mockResolvedValue({});

    const response = await createWeddingService(
      mockUser.id,
      mockWedding.weddingTitle,
      mockWedding.weddingDate,
      mockWedding.shippingAddress,
      mockGiftsArray,
    );

    expect(prisma.users.findUnique).toHaveBeenCalledWith({
      where: { id: mockUser.id },
    });

    expect(prisma.weddings.create).toHaveBeenCalledWith({
      data: {
        weddingTitle: mockWedding.weddingTitle,
        weddingDate: mockWedding.weddingDate,
        createdBy: mockUser.id,
        shippingAddress: mockWedding.shippingAddress,
      },
    });

    expect(prisma.gifts.create).toHaveBeenCalledTimes(1);

    expect(response).toEqual({
      message: 'Information successfully submitted to the database',
      newlyCreatedWedding: {
        id: mockWedding.id,
        weddingTitle: mockWedding.weddingTitle,
        weddingDate: mockWedding.weddingDate,
        shippingAddress: mockWedding.shippingAddress,
        createdBy: mockWedding.createdBy,
      },
    });
  });

  it('should throw AppError if user does not exist', async () => {
    const mockUserID = 'invalid-user';

    mockFindUser.mockResolvedValue(null);

    await expect(
      createWeddingService(mockUserID, 'Wedding1', '2025-01-02', 'Address 1', []),
    ).rejects.toThrow(AppError);
  });
});
