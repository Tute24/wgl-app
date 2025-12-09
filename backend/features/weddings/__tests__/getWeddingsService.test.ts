import { describe, it, expect, vi, type Mock } from 'vitest';
import { prisma } from '../../../lib/prisma';
import { getWeddingsService } from '../weddings.service';
import { AppError } from '../../../classes/app-error';
import { mockUser } from '../../__mocks__/mockUser';
import { mockWedding } from '../../__mocks__/mockWedding';

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: {
      findUnique: vi.fn(),
    },
    weddings: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

const mockFindUser = prisma.users.findUnique as Mock;
const mockFindManyWeddings = prisma.weddings.findMany as Mock;
const mockFindOneWedding = prisma.weddings.findUnique as Mock;

describe('getWeddingsService', () => {
  it('should return ownWeddings, guestWeddings and userInfo', async () => {
    const mockGuestRelation = [
      {
        referencedWedding: mockWedding.id,
      },
    ];

    const mockUserWithGuest = {
      ...mockUser,
      weddingsGuest: mockGuestRelation,
    };

    mockFindUser.mockResolvedValue(mockUserWithGuest);

    mockFindManyWeddings.mockResolvedValue([mockWedding]);

    mockFindOneWedding.mockResolvedValue(mockWedding);

    const response = await getWeddingsService(mockUser.id);

    expect(prisma.users.findUnique).toHaveBeenCalledWith({
      where: { id: mockUser.id },
      include: { weddingsGuest: true },
    });

    expect(prisma.weddings.findMany).toHaveBeenCalledWith({
      where: { createdBy: mockUser.id },
    });

    expect(prisma.weddings.findUnique).toHaveBeenCalledWith({
      where: { id: mockWedding.id },
    });

    expect(response).toEqual({
      message: 'Success.',
      ownWeddings: [mockWedding],
      guestWeddings: [mockWedding],
      userInfo: {
        userID: mockUser.id,
        userName: mockUser.firstName,
      },
    });
  });

  it('should throw AppError if user does not exist', async () => {
    const mockUserID = 'invalid-user';

    mockFindUser.mockResolvedValue(null);

    await expect(getWeddingsService(mockUserID)).rejects.toThrow(AppError);
  });
});
