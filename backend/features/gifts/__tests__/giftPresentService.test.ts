import { describe, expect, it, Mock, vi } from 'vitest';
import { prisma } from '../../../lib/prisma';
import { mockUser } from '../../__mocks__/mockUser';
import { mockGift } from '../../__mocks__/mockGift';
import { mockWedding } from '../../__mocks__/mockWedding';
import { giftPresentService } from '../gifts.service';

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: {
      findUnique: vi.fn(),
    },
    gifts: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    giftedBy: {
      create: vi.fn(),
    },
  },
}));

const mockUsersFindUnique = prisma.users.findUnique as Mock;
const mockGiftsFindUnique = prisma.gifts.findUnique as Mock;
const mockGiftsUpdate = prisma.gifts.update as Mock;
const mockGiftedByCreate = prisma.giftedBy.create as Mock;

describe('giftPresentService', () => {
  it('should call the service successfully', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser);
    mockGiftsFindUnique.mockResolvedValue(mockGift);
    mockGiftsUpdate.mockResolvedValue({
      ...mockGift,
      quantity: 1,
    });

    const response = await giftPresentService(
      mockUser.id,
      mockWedding.id,
      mockGift.giftID,
      mockGift.quantity - 1,
    );

    expect(response.message).toBe('Present gifted successfully.');
    expect(mockGiftsUpdate).toHaveBeenCalled();
    expect(mockGiftedByCreate).toHaveBeenCalled();
  });

  it('should throw 404 if user is not found', async () => {
    mockUsersFindUnique.mockResolvedValue(null);

    await expect(
      giftPresentService(mockUser.id, mockWedding.id, mockGift.giftID, mockGift.quantity),
    ).rejects.toMatchObject({
      message: "Couldn't find the user on the database.",
      status: 404,
    });
  });

  it('should throw 404 if gift is not found', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser);
    mockGiftsFindUnique.mockResolvedValue(null);

    await expect(
      giftPresentService(mockUser.id, mockWedding.id, mockGift.giftID, mockGift.quantity),
    ).rejects.toMatchObject({
      message: "Couldn't find this gift on the database.",
      status: 404,
    });
  });
});
