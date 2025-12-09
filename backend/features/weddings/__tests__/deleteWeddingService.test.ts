import { describe, it, expect, vi, type Mock } from 'vitest';
import { prisma } from '../../../lib/prisma';
import { deleteWeddingService } from '../weddings.service';
import { AppError } from '../../../classes/app-error';
import { mockUser } from '../../__mocks__/mockUser';
import { mockWedding } from '../../__mocks__/mockWedding';

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: {
      findUnique: vi.fn(),
    },
    weddings: {
      findUnique: vi.fn(),
      delete: vi.fn(),
    },
    guests: {
      deleteMany: vi.fn(),
    },
    gifts: {
      deleteMany: vi.fn(),
    },
    requests: {
      deleteMany: vi.fn(),
    },
    giftedBy: {
      deleteMany: vi.fn(),
    },
  },
}));

const mockFindUser = prisma.users.findUnique as Mock;
const mockFindWedding = prisma.weddings.findUnique as Mock;
const mockDeleteWedding = prisma.weddings.delete as Mock;
const mockDeleteGuests = prisma.guests.deleteMany as Mock;
const mockDeleteGifts = prisma.gifts.deleteMany as Mock;
const mockDeleteRequests = prisma.requests.deleteMany as Mock;
const mockDeleteGiftedBy = prisma.giftedBy.deleteMany as Mock;

describe('deleteWeddingService', () => {
  it('should delete wedding and all related data', async () => {
    mockFindUser.mockResolvedValue(mockUser);
    mockFindWedding.mockResolvedValue(mockWedding);

    mockDeleteGuests.mockResolvedValue({});
    mockDeleteGifts.mockResolvedValue({});
    mockDeleteRequests.mockResolvedValue({});
    mockDeleteGiftedBy.mockResolvedValue({});
    mockDeleteWedding.mockResolvedValue({});

    const response = await deleteWeddingService(mockUser.id, mockWedding.id);

    expect(prisma.users.findUnique).toHaveBeenCalledWith({
      where: { id: mockUser.id },
    });

    expect(prisma.weddings.findUnique).toHaveBeenCalledWith({
      where: { id: mockWedding.id },
    });

    expect(prisma.guests.deleteMany).toHaveBeenCalledWith({
      where: { referencedWedding: mockWedding.id },
    });

    expect(prisma.gifts.deleteMany).toHaveBeenCalledWith({
      where: { fromWedding: mockWedding.id },
    });

    expect(prisma.requests.deleteMany).toHaveBeenCalledWith({
      where: { relatedWedding: mockWedding.id },
    });

    expect(prisma.giftedBy.deleteMany).toHaveBeenCalledWith({
      where: { relatedWedding: mockWedding.id },
    });

    expect(prisma.weddings.delete).toHaveBeenCalledWith({
      where: { id: mockWedding.id },
    });

    expect(response).toEqual({
      message: 'Wedding deleted successfully.',
    });
  });

  it('should throw AppError if user does not exist', async () => {
    mockFindUser.mockResolvedValue(null);

    await expect(deleteWeddingService('invalid-user', 1)).rejects.toThrow(AppError);
  });

  it('should throw AppError if wedding does not exist', async () => {
    mockFindUser.mockResolvedValue(mockUser);
    mockFindWedding.mockResolvedValue(null);

    await expect(deleteWeddingService(mockUser.id, 999)).rejects.toThrow(AppError);
  });
});
