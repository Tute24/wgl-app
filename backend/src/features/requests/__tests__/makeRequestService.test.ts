import { describe, it, expect, vi, type Mock } from 'vitest';
import { prisma } from '../../../lib/prisma';
import { mockUser } from '../../__mocks__/mockUser';
import { mockWedding } from '../../__mocks__/mockWedding';
import { makeRequestService } from '../requests.service';

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: { findUnique: vi.fn() },
    weddings: { findUnique: vi.fn() },
    requests: { create: vi.fn() },
  },
}));

const mockUsersFindUnique = prisma.users.findUnique as Mock;
const mockWeddingsFindUnique = prisma.weddings.findUnique as Mock;
const mockRequestsCreate = prisma.requests.create as Mock;

describe('makeRequestService', () => {
  it('should create a request successfully', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser);
    mockWeddingsFindUnique.mockResolvedValue(mockWedding);
    mockRequestsCreate.mockResolvedValue({});

    const response = await makeRequestService(mockUser.id, mockWedding.id);

    expect(response).toEqual({ message: 'Request successfull.' });
    expect(mockRequestsCreate).toHaveBeenCalledWith({
      data: {
        requestBy: mockUser.id,
        relatedWedding: mockWedding.id,
        weddingTitle: mockWedding.weddingTitle,
        requestByName: `${mockUser.firstName} ${mockUser.lastName}`,
      },
    });
  });

  it('should throw 404 when user does not exist', async () => {
    mockUsersFindUnique.mockResolvedValue(null);

    await expect(makeRequestService(mockUser.id, mockWedding.id)).rejects.toMatchObject({
      message: 'User not found',
      status: 404,
    });
  });

  it('should throw 404 when wedding does not exist', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser);
    mockWeddingsFindUnique.mockResolvedValue(null);

    await expect(makeRequestService(mockUser.id, mockWedding.id)).rejects.toMatchObject({
      message: "Couldn't find this wedding's list",
      status: 404,
    });
  });
});
