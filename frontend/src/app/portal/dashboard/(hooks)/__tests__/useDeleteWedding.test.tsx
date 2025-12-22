import { describe, expect, it, Mock, vi } from 'vitest';
import { useWeddingsStore } from '@/stores/weddings/weddings.provider';
import { useGeneralStore } from '@/stores/general/general.provider';
import { AxiosApi } from '@/common/axios-api/axios-api';
import { weddingsMock } from '../../__mocks__/weddingsMock';
import { act, renderHook } from '@testing-library/react';
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler';
import { useRouter } from 'next/navigation';
import useDeleteWedding from '../useDeleteWedding';

vi.mock('@/common/axios-api/axios-api');
vi.mock('@/stores/weddings/weddings.provider');
vi.mock('@/stores/general/general.provider');
vi.mock('next/navigation');
vi.mock('@/app/(auxiliary-functions)/axios-error-handler');

const mockUseWeddingsStore = useWeddingsStore as Mock<typeof useWeddingsStore>;
const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>;
const mockAxiosApi = AxiosApi as Mock;
const mockAxiosErrorHandler = AxiosErrorHandler as Mock;
const mockUseRouter = useRouter as Mock;

describe('useDeleteWedding', () => {
  it('should call the hook succesfully and delete the specified wedding', async () => {
    const mockSetOwnWeddings = vi.fn();
    const mockOwnWeddings = [weddingsMock.ownWeddings];
    mockUseWeddingsStore.mockReturnValue({
      setOwnWeddings: mockSetOwnWeddings,
      ownWeddings: mockOwnWeddings,
    });

    const mockSetIsLoading = vi.fn();
    mockUseGeneralStore.mockReturnValue({ setIsLoading: mockSetIsLoading });

    mockAxiosApi.mockResolvedValueOnce({
      status: 200,
    });

    const { result } = renderHook(() => useDeleteWedding());

    await act(async () => {
      await result.current(weddingsMock.ownWeddings.id);
    });

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'post',
      route: '/weddings/delete',
      data: {
        id: weddingsMock.ownWeddings.id,
      },
    });
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(1, true);
    expect(mockSetOwnWeddings).toHaveBeenCalledWith(
      mockOwnWeddings.filter((item) => item.id !== weddingsMock.ownWeddings.id),
    );
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(2, false);
  });

  it('should behave correctly when theres an error', async () => {
    const mockRouter = vi.fn();
    mockUseRouter.mockReturnValue({ router: mockRouter });
    const mockSetIsLoading = vi.fn();
    mockUseGeneralStore.mockReturnValue({ setIsLoading: mockSetIsLoading });
    const mockedError = new Error('Error');

    mockAxiosApi.mockRejectedValue(mockedError);

    const { result } = renderHook(() => useDeleteWedding());

    await act(async () => {
      await result.current(weddingsMock.ownWeddings.id);
    });

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'post',
      route: '/weddings/delete',
      data: {
        id: weddingsMock.ownWeddings.id,
      },
    });
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(1, true);
    expect(mockAxiosErrorHandler).toHaveBeenCalledWith({
      route: { router: mockRouter },
      error: mockedError,
    });
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(2, false);
  });
});
