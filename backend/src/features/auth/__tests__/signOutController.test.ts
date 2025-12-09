import { describe, expect, it, vi } from 'vitest';
import { mockUser } from '../../__mocks__/mockUser';
import { signOutController } from '../auth.controller';

vi.mock('../auth.service');

const res = {
  status: vi.fn().mockReturnThis(),
  json: vi.fn(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

describe('signOutController', () => {
  it('should call the controller successfully', () => {
    const req = {
      authUser: {
        id: mockUser.id,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    signOutController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User signed out successfully.',
    });
  });

  it('should simulate an error when calling the controller', async () => {
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
