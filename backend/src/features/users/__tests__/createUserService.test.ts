import { describe, it, expect, vi, type Mock } from 'vitest';
import { prisma } from '../../../lib/prisma';
import { createUserService } from '../users.service';
import { mockUser } from '../../__mocks__/mockUser';

vi.mock('bcrypt', () => ({
  hash: vi.fn(),
}));

vi.mock('jsonwebtoken', () => ({
  sign: vi.fn(),
}));

vi.mock('../../../env', () => ({
  env: {
    SECRET_KEY: 'key',
  },
}));

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: { findUnique: vi.fn(), create: vi.fn() },
  },
}));

const mockUsersFindUnique = prisma.users.findUnique as Mock;
const mockUsersCreate = prisma.users.create as Mock;

describe('createUserService', () => {
  it('should create user successfully', async () => {
    const mockHash = (await import('bcrypt')).hash as Mock;
    const mockJwtSign = (await import('jsonwebtoken')).sign as Mock;
    mockHash.mockResolvedValue('hashedpassword123');

    mockUsersFindUnique.mockResolvedValue(null);

    mockUsersCreate.mockResolvedValue({
      ...mockUser,
      password: 'hashedpassword123',
    });

    mockJwtSign.mockReturnValue('signed-token');

    const response = await createUserService(
      mockUser.firstName,
      mockUser.lastName,
      mockUser.email,
      'password',
    );

    expect(response).toEqual({
      message: 'Success!',
      newUser: {
        ...mockUser,
        password: 'hashedpassword123',
      },
      token: 'signed-token',
    });

    expect(mockUsersCreate).toHaveBeenCalled();
    expect(mockJwtSign).toHaveBeenCalled();
  });

  it('should throw 409 if email already exists', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser);

    await expect(
      createUserService(mockUser.firstName, mockUser.lastName, mockUser.email, 'password'),
    ).rejects.toMatchObject({
      message: 'An user with the submitted email already exists!',
      status: 409,
    });
  });
});
