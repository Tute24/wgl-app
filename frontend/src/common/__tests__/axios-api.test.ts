import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { authStoreInstance } from '@/stores/auth/auth.provider';
import { AxiosApi, axiosInstance } from '../axios-api/axios-api';

vi.mock('@/stores/auth/auth.provider', () => ({
  authStoreInstance: {
    getState: vi.fn(),
  },
}));

const mockAuthStoreInstanceGetState = authStoreInstance.getState as unknown as Mock;

describe('AxiosApi', () => {
  const mockToken = 'mocked-token';
  const mockRequest = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    axiosInstance.request = mockRequest;
  });

  it('calls axiosInstance.request with correct parameters for POST', async () => {
    mockAuthStoreInstanceGetState.mockReturnValue({ token: mockToken });
    const requestData = { name: 'John' };
    const route = '/users';

    await AxiosApi({ httpMethod: 'post', data: requestData, route });

    expect(mockRequest).toHaveBeenCalledWith({
      method: 'post',
      data: requestData,
      params: undefined,
      url: route,
      headers: { Authorization: `Bearer ${mockToken}` },
    });
  });

  it('calls axiosInstance.request with correct parameters for GET', async () => {
    mockAuthStoreInstanceGetState.mockReturnValue({ token: mockToken });
    const params = { id: 123 };
    const route = '/users';

    await AxiosApi({ httpMethod: 'get', params, route });

    expect(mockRequest).toHaveBeenCalledWith({
      method: 'get',
      data: undefined,
      params,
      url: route,
      headers: { Authorization: `Bearer ${mockToken}` },
    });
  });

  it('uses empty token if store returns undefined', async () => {
    mockAuthStoreInstanceGetState.mockReturnValue({ token: undefined });
    const route = '/no-token';
    await AxiosApi({ httpMethod: 'get', route });

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: { Authorization: 'Bearer undefined' },
      }),
    );
  });
});
