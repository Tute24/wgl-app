import { describe, expect, it, vi } from 'vitest';
import { mockUser } from '../../__mocks__/mockUser';

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}));

vi.mock('../auth.service', () => ({
  signInService: vi.fn(),
  forgotPasswordService: vi.fn(),
  resetPasswordService: vi.fn(),
}));

import { signOutController } from '../auth.controller';

const res = {
  status: vi.fn().mockReturnThis(),
  json: vi.fn(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

describe('signOutController', () => {
  it('should call the controller successfully', () => {
    const req = {
      authUser: { id: mockUser.id },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    signOutController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User signed out successfully.',
    });
  });

  it('should return 401 if authUser is null', () => {
    const req = {
      authUser: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    signOutController(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Not authenticated',
    });
  });
});
