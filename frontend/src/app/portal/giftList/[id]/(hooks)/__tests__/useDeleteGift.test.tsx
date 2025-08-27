import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { AxiosApi } from '@/common/axios-api/axios-api'
import { useGeneralStore } from '@/stores/general/general.provider'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import { useRouter } from 'next/navigation'
import { describe, expect, it, Mock, vi } from 'vitest'
import { giftListMocks } from '../../__mocks__/gift-list-mocks'
import { act, renderHook } from '@testing-library/react'
import useDeleteGift from '../useDeleteGift'

vi.mock('@/app/(auxiliary-functions)/axios-error-handler')
vi.mock('@/common/axios-api/axios-api')
vi.mock('@/stores/general/general.provider')
vi.mock('@/stores/gifts/gifts.provider')
vi.mock('next/navigation')

const mockUseGiftsStore = useGiftsStore as Mock<typeof useGiftsStore>
const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>
const mockAxiosApi = AxiosApi as Mock
const mockAxiosErrorHandler = AxiosErrorHandler as Mock
const mockUseRouter = useRouter as Mock

describe('useDeleteGifts', () => {
  it('calls the hook successfully and delete the specified gift', async () => {
    const mockSetWeddingGifts = vi.fn()
    const mockWeddingGifts = giftListMocks.weddingGifts
    mockUseGiftsStore.mockReturnValue({
      setWeddingGifts: mockSetWeddingGifts,
      weddingGifts: mockWeddingGifts,
    })

    const mockSetIsLoading = vi.fn()
    mockUseGeneralStore.mockReturnValue({
      setIsLoading: mockSetIsLoading,
    })

    mockAxiosApi.mockResolvedValueOnce({
      status: 200,
    })
    const { result } = renderHook(() => useDeleteGift())

    await act(async () => {
      await result.current(giftListMocks.weddingGifts[0].Id)
    })

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'post',
      route: '/gifts/delete',
      data: {
        giftID: giftListMocks.weddingGifts[0].Id,
      },
    })
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(1, true)
    expect(mockSetWeddingGifts).toHaveBeenCalledWith(
      mockWeddingGifts.filter(
        (gift) => gift.Id !== giftListMocks.weddingGifts[0].Id,
      ),
    )
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(2, false)
  })

  it('mocks a situation where the api returns an error', async () => {
    const mockRouter = vi.fn()
    mockUseRouter.mockReturnValue({ router: mockRouter })
    const mockSetIsLoading = vi.fn()
    mockUseGeneralStore.mockReturnValue({ setIsLoading: mockSetIsLoading })
    const mockedError = new Error('Error')

    mockAxiosApi.mockRejectedValue(mockedError)

    const { result } = renderHook(() => useDeleteGift())

    await act(async () => {
      await result.current(1)
    })

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'post',
      route: '/gifts/delete',
      data: {
        giftID: giftListMocks.weddingGifts[0].Id,
      },
    })
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(1, true)
    expect(mockAxiosErrorHandler).toHaveBeenCalledWith({
      route: { router: mockRouter },
      error: mockedError,
    })
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(2, false)
  })
})
