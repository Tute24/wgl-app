import { describe, it, expect, vi, type Mock } from 'vitest';
import { prisma } from '../../../lib/prisma';
import { getRequestsService } from '../requests.service';
import { mockUser } from '../../__mocks__/mockUser';
import { mockRequest } from '../../__mocks__/mockRequest';

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: { findUnique: vi.fn() },
    requests: { findMany: vi.fn() },
  },
}));

const mockUsersFindUnique = prisma.users.findUnique as Mock;
const mockRequestsFindMany = prisma.requests.findMany as Mock;

describe('getRequestsService', () => {
  it('should return all requests formatted', async () => {
    mockUsersFindUnique.mockResolvedValue({
      ...mockUser,
      weddingsOwn: [{ id: 1 }],
    });

    mockRequestsFindMany.mockResolvedValue([mockRequest]);

    const response = await getRequestsService(mockUser.id);

    expect(response.requests).toBeDefined();
    expect(response.requests!.length).toBe(1);
    expect(response.requests![0]).toMatchObject({
      id: mockRequest.id,
      pending: mockRequest.pending,
      madeOn: expect.any(String),
    });
  });

  it('should return only pending count when onlyPending = true', async () => {
    mockUsersFindUnique.mockResolvedValue({
      ...mockUser,
      weddingsOwn: [{ id: 1 }],
    });

    mockRequestsFindMany.mockResolvedValue([mockRequest]);

    const response = await getRequestsService(mockUser.id, true);

    expect(response).toEqual({ pendingRequests: 1 });
  });

  it('should throw 404 if user does not exist', async () => {
    mockUsersFindUnique.mockResolvedValue(null);

    await expect(getRequestsService(mockUser.id)).rejects.toMatchObject({
      message: 'User not found.',
      status: 404,
    });
  });
});
