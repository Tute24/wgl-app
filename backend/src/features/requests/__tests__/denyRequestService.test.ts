import { describe, it, expect, vi, type Mock } from 'vitest';
import { prisma } from '../../../lib/prisma';
import { mockUser } from '../../__mocks__/mockUser';
import { mockRequest } from '../../__mocks__/mockRequest';
import { denyRequestService } from '../requests.service';

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: { findUnique: vi.fn() },
    requests: { findUnique: vi.fn(), update: vi.fn() },
  },
}));

const mockUsersFindUnique = prisma.users.findUnique as Mock;
const mockRequestsFindUnique = prisma.requests.findUnique as Mock;
const mockRequestsUpdate = prisma.requests.update as Mock;

describe('denyRequestService', () => {
  it('should deny request successfully', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser);
    mockRequestsFindUnique.mockResolvedValue(mockRequest);
    mockRequestsUpdate.mockResolvedValue({
      ...mockRequest,
      pending: false,
    });

    const response = await denyRequestService(mockUser.id, mockRequest.id);

    expect(response).toEqual({ message: 'Request denied successfully.' });
    expect(mockRequestsUpdate).toHaveBeenCalled();
  });

  it('should throw 404 if user does not exist', async () => {
    mockUsersFindUnique.mockResolvedValue(null);

    await expect(denyRequestService(mockUser.id, mockRequest.id)).rejects.toMatchObject({
      message: 'User not found',
      status: 404,
    });
  });

  it('should throw 404 if request does not exist', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser);
    mockRequestsFindUnique.mockResolvedValue(null);

    await expect(denyRequestService(mockUser.id, mockRequest.id)).rejects.toMatchObject({
      message: "Couldn't find this request on the database.",
      status: 404,
    });
  });

  it('should throw 403 if user is not the wedding creator', async () => {
    mockUsersFindUnique.mockResolvedValue({
      ...mockUser,
      weddingsOwn: [],
    });

    mockRequestsFindUnique.mockResolvedValue(mockRequest);

    await expect(denyRequestService(mockUser.id, mockRequest.id)).rejects.toMatchObject({
      message: 'This user is not the wedding creator.',
      status: 403,
    });
  });

  it('should throw 409 if request has already been reviewed', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser);

    mockRequestsFindUnique.mockResolvedValue({
      ...mockRequest,
      pending: false,
    });

    await expect(denyRequestService(mockUser.id, mockRequest.id)).rejects.toMatchObject({
      message: 'This request has already been reviewed.',
      status: 409,
    });
  });
});
