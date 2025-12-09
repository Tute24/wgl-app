import { describe, it, expect, vi, Mock } from 'vitest';
import { prisma } from '../../../lib/prisma';
import { mockUser } from '../../__mocks__/mockUser';
import { mockWedding } from '../../__mocks__/mockWedding';
import { mockGift } from '../../__mocks__/mockGift';
import { getGiftedProductsService } from '../gifts.service';

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: { findUnique: vi.fn() },
    weddings: { findUnique: vi.fn() },
    giftedBy: { findMany: vi.fn(), findFirst: vi.fn() },
  },
}));

const mockUsersFindUnique = prisma.users.findUnique as Mock;
const mockWeddingsFindUnique = prisma.weddings.findUnique as Mock;
const mockGiftedFindMany = prisma.giftedBy.findMany as Mock;
const mockGiftedFindFirst = prisma.giftedBy.findFirst as Mock;

describe('getGiftedProductsService', () => {
  const userID = mockUser.id;
  const weddingID = mockWedding.id;

  it('should return success response with mapped gifted products', async () => {
    mockUsersFindUnique.mockResolvedValueOnce(mockUser);
    mockWeddingsFindUnique.mockResolvedValueOnce(mockWedding);

    mockGiftedFindMany.mockResolvedValueOnce([
      {
        id: 1,
        presenter: mockUser.id,
        quantity: 2,
        giftName: mockGift.productName,
        giftedAt: '2025-01-10',
        relatedWedding: weddingID,
      },
    ]);

    mockUsersFindUnique.mockResolvedValueOnce(mockUser);

    mockGiftedFindFirst.mockResolvedValueOnce({
      id: 1,
      presenter: mockUser.id,
      quantity: 2,
      giftName: mockGift.productName,
      giftedAt: '2025-01-10',
      relatedWedding: weddingID,
    });

    const response = await getGiftedProductsService(userID, weddingID);

    expect(response.message).toBe('Fetch successful!');
    expect(response.giftedProducts.listHeader.weddingId).toBe(weddingID);
    expect(response.giftedProducts.mappingAddGifter.length).toBe(1);
    expect(response.giftedProducts.mappingAddGifter[0].presenter).toBe('John ');
  });

  it("should throw 404 if user doesn't exist", async () => {
    mockUsersFindUnique.mockResolvedValueOnce(null);

    await expect(getGiftedProductsService(userID, weddingID)).rejects.toMatchObject({
      message: "Couldn't find the user on the database.",
      status: 404,
    });
  });

  it("should throw 404 if wedding doesn't exist", async () => {
    mockUsersFindUnique.mockResolvedValueOnce(mockUser);
    mockWeddingsFindUnique.mockResolvedValueOnce(null);

    await expect(getGiftedProductsService(userID, weddingID)).rejects.toMatchObject({
      message: "Couldn't find the wedding on the database.",
      status: 404,
    });
  });

  it("should throw 403 if wedding wasn't created by logged user", async () => {
    mockUsersFindUnique.mockResolvedValueOnce(mockUser);
    mockWeddingsFindUnique.mockResolvedValueOnce({
      ...mockWedding,
      createdBy: 'another-user-id',
    });

    await expect(getGiftedProductsService(userID, weddingID)).rejects.toMatchObject({
      message: "You don't have access to this page.",
      status: 403,
    });
  });
});
