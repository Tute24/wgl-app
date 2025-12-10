import { useGeneralStore } from '@/stores/general/general.provider';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler';
import axios from 'axios';
import useSubmitPasswordReset from '../useSubmitPasswordReset';
import { useParams } from 'next/navigation';
import { newPassword } from '../../page';

vi.mock('next/navigation');
vi.mock('axios');
vi.mock('@/stores/general/general.provider');
vi.mock('@/app/(auxiliary-functions)/axios-error-handler');

const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>;
const mockAxiosPost = axios.post as unknown as Mock;
const mockAxiosErrorHandler = AxiosErrorHandler as Mock;
const mockUseParams = useParams as Mock;

const token = 'token';

const mockData: newPassword = {
  password: 'Test12345!',
  confirmPassword: 'Test12345!',
};

describe('useSubmitPasswordReset', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockUseParams.mockReturnValue({ token });
  });
  it('should call the hook successfully', async () => {
    mockAxiosPost.mockResolvedValueOnce({
      status: 200,
    });

    process.env.NEXT_PUBLIC_API_URL = 'https://mockapi.com';

    const mockSetStatusMessage = vi.fn();
    const mockSetIsLoading = vi.fn();
    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: mockSetStatusMessage,
      setIsLoading: mockSetIsLoading,
    });

    const { result } = renderHook(() => useSubmitPasswordReset());

    await act(async () => {
      await result.current(mockData);
    });

    expect(mockSetIsLoading).toHaveBeenNthCalledWith(1, true);
    expect(mockAxiosPost).toHaveBeenCalledWith(
      'https://mockapi.com/auth/reset-password',
      mockData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    expect(mockSetStatusMessage).toHaveBeenCalledWith(
      'Your password was updated successfully. Go back to the sign in page.',
    );
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(2, false);
  });

  it('should not call the hook if the passwords dont match', async () => {
    const mockDifferentData = {
      password: 'Teste12345!',
      confirmPassword: 'Test12345!',
    };

    process.env.NEXT_PUBLIC_API_URL = 'https://mockapi.com';

    const mockSetStatusMessage = vi.fn();
    const mockSetIsLoading = vi.fn();
    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: mockSetStatusMessage,
      setIsLoading: mockSetIsLoading,
    });

    const { result } = renderHook(() => useSubmitPasswordReset());

    await act(async () => {
      await result.current(mockDifferentData);
    });

    expect(mockSetIsLoading).not.toHaveBeenCalled();
    expect(mockAxiosPost).not.toHaveBeenCalled();
    expect(mockSetStatusMessage).toHaveBeenCalledWith('Passwords must be the same!');
  });

  it('mocks a situation where the api returns an error', async () => {
    const mockedError = new Error('Error');
    mockAxiosPost.mockRejectedValueOnce(mockedError);

    process.env.NEXT_PUBLIC_API_URL = 'https://mockapi.com';

    const mockSetIsLoading = vi.fn();
    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: vi.fn(),
      setIsLoading: mockSetIsLoading,
    });

    const { result } = renderHook(() => useSubmitPasswordReset());

    await act(async () => {
      await result.current(mockData);
    });

    expect(mockSetIsLoading).toHaveBeenNthCalledWith(1, true);
    expect(mockAxiosPost).toHaveBeenCalledWith(
      'https://mockapi.com/auth/reset-password',
      mockData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    expect(mockAxiosErrorHandler).toHaveBeenCalledWith({
      error: mockedError,
    });
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(2, false);
  });
});
