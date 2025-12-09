import { describe, expect, it, Mock, vi } from 'vitest';
import { prisma } from '../../../lib/prisma';
import { mockUser } from '../../__mocks__/mockUser';
import { signInService } from '../auth.service';
import { AppError } from '../../../classes/app-error';

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: {
      findUnique: vi.fn(),
    },
  },
}));

const mockFindUnique = prisma.users.findUnique as unknown as Mock;

describe('signInService', () => {
  it('should successfully signIn an user', async () => {
    mockFindUnique.mockResolvedValue(mockUser);

    const result = await signInService(mockUser.email, 'password');

    expect(result.username).toBe(mockUser.firstName);
    expect(result.token).toBeTruthy();
    expect(typeof result.token).toBe('string');
  });

  it('should throw AppError with 404 if the logIn user does not exist', async () => {
    mockFindUnique.mockResolvedValue(null);

    await expect(signInService('email@email.com', 'password')).rejects.toThrowError(AppError);
    await expect(signInService('email@email.com', 'password')).rejects.toMatchObject({
      message: "This email doesn't belong to an existent user.",
      status: 404,
    });
  });

  it('should throw AppError with 401 if the password is wrong', async () => {
    mockFindUnique.mockResolvedValue(mockUser);

    await expect(signInService(mockUser.email, 'password1234')).rejects.toThrowError(AppError);
    await expect(signInService(mockUser.email, 'password1234')).rejects.toMatchObject({
      message: 'Incorrect password.',
      status: 401,
    });
  });
});
