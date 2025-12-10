import { AxiosApi } from '@/common/axios-api/axios-api';
import { authStoreInstance } from '@/stores/auth/auth.provider';
import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { describe, expect, it, Mock, vi } from 'vitest';
import useLogOut from '../useSignOut';
import AxiosErrorHandler from '../../axios-error-handler';

vi.mock('next/navigation');
vi.mock('@/common/axios-api/axios-api');
vi.mock('../../axios-error-handler');
vi.mock('@/stores/auth/auth.provider', () => ({
  authStoreInstance: {
    getState: vi.fn(),
  },
}));

const mockUseRouter = useRouter as Mock;
const mockAxiosApi = AxiosApi as Mock;
const mockAxiosErrorHandler = AxiosErrorHandler as Mock;
const mockAuthStoreInstanceGetState = authStoreInstance.getState as unknown as Mock;

describe('useSignIn', () => {
  it('should call the useSignIn hook successfully', async () => {
    const mockRouterPush = vi.fn();
    mockUseRouter.mockReturnValue({ push: mockRouterPush });

    const mockSetToken = vi.fn();
    mockAuthStoreInstanceGetState.mockReturnValue({ setToken: mockSetToken });

    mockAxiosApi.mockResolvedValue({
      status: 200,
    });

    const { result } = renderHook(() => useLogOut());

    await act(async () => {
      await result.current();
    });

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'get',
      route: '/auth/sign-out',
    });
    expect(mockSetToken).toHaveBeenCalledWith(null);
    expect(mockRouterPush).toHaveBeenCalledWith('/');
  });

  it('handles error when calling the hook', async () => {
    const mockedError = new Error('Error');
    const mockRouter = vi.fn();
    mockUseRouter.mockReturnValue({ router: mockRouter });

    mockAxiosApi.mockRejectedValue(mockedError);

    const { result } = renderHook(() => useLogOut());

    await act(async () => {
      await result.current();
    });

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'get',
      route: '/auth/sign-out',
    });
    expect(mockAxiosErrorHandler).toHaveBeenCalledWith({
      error: mockedError,
      route: { router: mockRouter },
    });
  });
});
