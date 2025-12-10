import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useGeneralStore } from '@/stores/general/general.provider';
import { authStoreInstance } from '@/stores/auth/auth.provider';
import { axiosInstance } from '@/common/axios-api/axios-api';
import useSubmitRegister from '../useSubmitRegister';

vi.mock('next/navigation');
vi.mock('@/stores/general/general.provider');
vi.mock('@/common/axios-api/axios-api');

vi.mock('@/stores/auth/auth.provider', () => ({
  authStoreInstance: {
    getState: vi.fn(),
  },
}));

describe('useSubmitRegister', () => {
  const mockRouterPush = vi.fn();
  const mockSetStatusMessage = vi.fn();
  const mockSetToken = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as Mock).mockReturnValue({ push: mockRouterPush });
    (useGeneralStore as Mock).mockReturnValue({
      setStatusMessage: mockSetStatusMessage,
    });
    (authStoreInstance.getState as unknown as Mock).mockReturnValue({
      setToken: mockSetToken,
    });
  });

  const mockData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@example.com',
    password: '123456',
    confirmPassword: '123456',
  };

  it('calls API successfully and redirects to dashboard', async () => {
    (axiosInstance.post as unknown as Mock).mockResolvedValue({
      status: 200,
      data: { token: 'fake-token' },
    });

    const { result } = renderHook(() => useSubmitRegister());

    await act(async () => {
      await result.current(mockData);
    });

    expect(axiosInstance.post).toHaveBeenCalledWith('/users/user-create', mockData);
    expect(mockSetToken).toHaveBeenCalledWith('fake-token');
    expect(mockRouterPush).toHaveBeenCalledWith('/portal/dashboard');
  });

  it('handles 409 error', async () => {
    const error409 = {
      response: { status: 409 },
      isAxiosError: true,
    };

    (axiosInstance.post as unknown as Mock).mockRejectedValue(error409);

    const { result } = renderHook(() => useSubmitRegister());

    await act(async () => {
      await result.current(mockData);
    });

    expect(mockSetStatusMessage).toHaveBeenCalledWith(
      'There is already an existent user with this e-mail!',
    );
  });

  it('handles 500 error', async () => {
    const error500 = {
      response: { status: 500 },
      isAxiosError: true,
    };

    (axiosInstance.post as unknown as Mock).mockRejectedValue(error500);

    const { result } = renderHook(() => useSubmitRegister());

    await act(async () => {
      await result.current(mockData);
    });

    expect(mockSetStatusMessage).toHaveBeenCalledWith(
      'Something went wrong within the server. Try again soon.',
    );
  });
});
