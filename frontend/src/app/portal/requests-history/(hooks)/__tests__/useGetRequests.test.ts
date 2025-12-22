import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler';
import { AxiosApi } from '@/common/axios-api/axios-api';
import { useGeneralStore } from '@/stores/general/general.provider';
import { describe, expect, it, Mock, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useRequestsStore } from '@/stores/requests/requests.provider';
import { requestsResponseMock } from '../../__mocks__/requests-history-mock';
import useGetRequests from '../useGetRequests';

vi.mock('@/app/(auxiliary-functions)/axios-error-handler');
vi.mock('@/common/axios-api/axios-api');
vi.mock('@/stores/general/general.provider');
vi.mock('@/stores/requests/requests.provider');

const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>;
const mockUseRequestsStore = useRequestsStore as Mock<typeof useRequestsStore>;
const mockAxiosApi = AxiosApi as Mock;
const mockAxiosErrorHandler = AxiosErrorHandler as Mock;

describe('useGetRequests', () => {
  it('calls the hook successfully and populates the stores', async () => {
    const mockSetRequests = vi.fn();
    const mockSetFilteredRequests = vi.fn();
    mockUseRequestsStore.mockReturnValue({
      setRequests: mockSetRequests,
      setFilteredRequests: mockSetFilteredRequests,
    });

    const mockSetIsRendering = vi.fn();
    mockUseGeneralStore.mockReturnValue({
      setIsRendering: mockSetIsRendering,
    });

    mockAxiosApi.mockReturnValue({
      status: 200,
      data: {
        requests: requestsResponseMock,
        filteredRequests: requestsResponseMock,
      },
    });

    const { result } = renderHook(() => useGetRequests());

    await act(async () => {
      await result.current();
    });

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'get',
      route: '/requests/get',
    });

    expect(mockSetIsRendering).toHaveBeenNthCalledWith(1, true);
    expect(mockSetRequests).toHaveBeenCalledWith(requestsResponseMock);
    expect(mockSetFilteredRequests).toHaveBeenCalledWith(requestsResponseMock);
    expect(mockSetIsRendering).toHaveBeenNthCalledWith(2, false);
  });

  it('mocks a situation where the api returns an error', async () => {
    const mockSetIsRendering = vi.fn();
    mockUseGeneralStore.mockReturnValue({ setIsRendering: mockSetIsRendering });
    const mockedError = new Error('Error');

    mockAxiosApi.mockRejectedValue(mockedError);

    const { result } = renderHook(() => useGetRequests());

    await act(async () => {
      await result.current();
    });

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'get',
      route: '/requests/get',
    });

    expect(mockSetIsRendering).toHaveBeenNthCalledWith(1, true);
    expect(mockAxiosErrorHandler).toHaveBeenCalledWith({
      error: mockedError,
    });
    expect(mockSetIsRendering).toHaveBeenNthCalledWith(2, false);
  });
});
