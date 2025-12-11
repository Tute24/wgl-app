import { describe, expect, it, Mock, vi } from 'vitest';
import { AxiosApi } from '@/common/axios-api/axios-api';
import { act, renderHook } from '@testing-library/react';
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler';
import { useRouter } from 'next/navigation';
import { useGiftsStore } from '@/stores/gifts/gifts.provider';
import { giftListMocks } from '../../__mocks__/gift-list-mocks';
import useSubmitUpdate from '../useSubmitUpdate';
import { objValuesType } from '../../(components)/giftsListDisplay/owner-list';

vi.mock('@/common/axios-api/axios-api');
vi.mock('@/stores/gifts/gifts.provider');
vi.mock('@/stores/general/general.provider');
vi.mock('next/navigation');
vi.mock('@/app/(auxiliary-functions)/axios-error-handler');

const mockUseGiftsStore = useGiftsStore as Mock<typeof useGiftsStore>;
const mockAxiosApi = AxiosApi as Mock;
const mockAxiosErrorHandler = AxiosErrorHandler as Mock;
const mockUseRouter = useRouter as Mock;

describe('useSubmitUpdate', () => {
  const mockObjectValues: objValuesType = {
    quantity: 3,
    productName: 'updatedProduct1',
    productLink: 'https://wwww.updatedproduct1.com',
  };

  const mockUpdateProps = {
    ...mockObjectValues,
    giftID: giftListMocks.weddingGifts[0].Id,
  };
  it('shoudl call the hook succesfully and update the update the gift props correctly', async () => {
    const mockSetWeddingGifts = vi.fn();
    const mockSetSelectedGiftID = vi.fn();
    const mockWeddingGifts = giftListMocks.weddingGifts;
    mockUseGiftsStore.mockReturnValue({
      setWeddingGifts: mockSetWeddingGifts,
      setSelectedGiftID: mockSetSelectedGiftID,
      weddingGifts: mockWeddingGifts,
    });

    mockAxiosApi.mockResolvedValueOnce({
      status: 200,
    });

    const { result } = renderHook(() => useSubmitUpdate());

    await act(async () => {
      await result.current(mockObjectValues, giftListMocks.weddingGifts[0].Id);
    });

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'post',
      route: '/gifts/update',
      data: mockUpdateProps,
    });
    expect(mockSetSelectedGiftID).toHaveBeenCalledWith(null);
    expect(mockSetWeddingGifts).toHaveBeenCalledWith(
      mockWeddingGifts.map((gift) =>
        mockUpdateProps.giftID === gift.Id
          ? {
              ...gift,
              productLink: mockUpdateProps.productLink,
              productName: mockUpdateProps.productName,
              quantity: mockUpdateProps.quantity,
            }
          : gift,
      ),
    );
  });

  it('mocks a situation where the api returns an error', async () => {
    const mockRouter = vi.fn();
    mockUseRouter.mockReturnValue({ router: mockRouter });
    const mockedError = new Error('Error');

    mockAxiosApi.mockRejectedValue(mockedError);

    const { result } = renderHook(() => useSubmitUpdate());

    await act(async () => {
      await result.current(mockObjectValues, giftListMocks.weddingGifts[0].Id);
    });

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'post',
      route: '/gifts/update',
      data: mockUpdateProps,
    });
    expect(mockAxiosErrorHandler).toHaveBeenCalledWith({
      route: { router: mockRouter },
      error: mockedError,
    });
  });
});
