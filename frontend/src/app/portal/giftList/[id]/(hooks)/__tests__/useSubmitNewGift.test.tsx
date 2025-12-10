import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler';
import { AxiosApi } from '@/common/axios-api/axios-api';
import { useGeneralStore } from '@/stores/general/general.provider';
import { useGiftsStore } from '@/stores/gifts/gifts.provider';
import { useParams, useRouter } from 'next/navigation';
import { describe, expect, it, Mock, vi } from 'vitest';
import { giftListMocks } from '../../__mocks__/gift-list-mocks';
import { act, renderHook } from '@testing-library/react';
import { z } from 'zod';
import { newGiftsSchema } from '@/zodSchemas/giftsSchema';
import useSubmitNewGift from '../useSubmitNewGifts';

vi.mock('@/app/(auxiliary-functions)/axios-error-handler');
vi.mock('@/common/axios-api/axios-api');
vi.mock('@/stores/general/general.provider');
vi.mock('@/stores/gifts/gifts.provider');
vi.mock('next/navigation');

const mockUseGiftsStore = useGiftsStore as Mock<typeof useGiftsStore>;
const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>;
const mockAxiosApi = AxiosApi as Mock;
const mockAxiosErrorHandler = AxiosErrorHandler as Mock;
const mockUseRouter = useRouter as Mock;
const mockUseParams = useParams as Mock;

describe('useSubmitNewGift', () => {
  type submitData = z.infer<typeof newGiftsSchema>;
  const mockSubmitData: submitData = {
    gifts: [
      {
        quantity: '1',
        productName: 'Product2',
        productLink: 'https://wwww.product2.com',
      },
    ],
  };

  it('calls the hook successfully and populates the zustand stores', async () => {
    const mockSetStatusMessage = vi.fn();
    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: mockSetStatusMessage,
    });
    const mockSetWeddingGifts = vi.fn();
    mockUseGiftsStore.mockReturnValue(mockSetWeddingGifts);

    mockUseParams.mockReturnValue({ id: giftListMocks.listHeader.weddingId });

    mockAxiosApi.mockResolvedValueOnce({
      status: 200,
      data: { newGifts: giftListMocks.weddingGifts },
    });

    const { result } = renderHook(() => useSubmitNewGift());

    await act(async () => {
      await result.current(mockSubmitData);
    });

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'post',
      route: '/gifts/create',
      data: mockSubmitData.gifts,
      params: { id: giftListMocks.listHeader.weddingId },
    });
    expect(mockSetWeddingGifts).toHaveBeenCalledWith(giftListMocks.weddingGifts);
  });

  it('mocks a situation where the api returns an error', async () => {
    const mockSetStatusMessage = vi.fn();
    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: mockSetStatusMessage,
    });

    const mockRouter = vi.fn();
    mockUseRouter.mockReturnValue({ router: mockRouter });
    const mockedError = new Error('Error');

    mockAxiosApi.mockRejectedValue(mockedError);

    const { result } = renderHook(() => useSubmitNewGift());

    await act(async () => {
      await result.current(mockSubmitData);
    });

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'post',
      route: '/gifts/create',
      data: mockSubmitData.gifts,
      params: { id: giftListMocks.listHeader.weddingId },
    });
    expect(mockAxiosErrorHandler).toHaveBeenCalledWith({
      route: { router: mockRouter },
      error: mockedError,
      setStatusMessage: mockSetStatusMessage,
    });
  });
});
