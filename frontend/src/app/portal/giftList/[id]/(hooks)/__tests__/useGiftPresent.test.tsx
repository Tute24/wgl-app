import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { AxiosApi } from '@/common/axios-api/axios-api'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import { useParams, useRouter } from 'next/navigation'
import { describe, expect, it, Mock, vi } from 'vitest'
import { giftListMocks } from '../../__mocks__/gift-list-mocks'
import { act, renderHook } from '@testing-library/react'
import useGiftPresent from '../useGiftPresent'

vi.mock('@/app/(auxiliary-functions)/axios-error-handler')
vi.mock('@/common/axios-api/axios-api')
vi.mock('@/stores/general/general.provider')
vi.mock('@/stores/gifts/gifts.provider')
vi.mock('next/navigation')

const mockUseGiftsStore = useGiftsStore as Mock<typeof useGiftsStore>
const mockAxiosApi = AxiosApi as Mock
const mockAxiosErrorHandler = AxiosErrorHandler as Mock
const mockUseRouter = useRouter as Mock
const mockUseParams = useParams as Mock

describe('useGiftPresent', () => {
  const mockSendGiftObj = {
    giftID: giftListMocks.weddingGifts[0].Id,
    quantity: 1,
  }
  it('calls the hook successfully and populates the zustand stores', async () => {
    const mockSetWeddingGifts = vi.fn()
    const mockSetSelectedGiftID = vi.fn()
    const mockWeddingGifts = giftListMocks.weddingGifts
    mockUseGiftsStore.mockReturnValue({
      setWeddingGifts: mockSetWeddingGifts,
      setSelectedGiftID: mockSetSelectedGiftID,
      weddingGifts: mockWeddingGifts,
    })

    mockUseParams.mockReturnValue({ id: giftListMocks.listHeader.weddingId })

    mockAxiosApi.mockResolvedValueOnce({
      status: 200,
    })

    const { result } = renderHook(() => useGiftPresent())

    await act(async () => {
      await result.current(mockSendGiftObj.giftID, mockSendGiftObj.quantity)
    })

    expect(mockSetSelectedGiftID).toHaveBeenCalledWith(null)
    expect(mockSetWeddingGifts).toHaveBeenCalledWith(
      giftListMocks.weddingGifts.map((item) =>
        item.Id === mockSendGiftObj.giftID
          ? {
              ...item,
              quantity: item.quantity - Number(mockSendGiftObj.quantity),
            }
          : item,
      ),
    )
  })

  it('mocks a situation where the api returns an error', async () => {
    const mockRouter = vi.fn()
    mockUseRouter.mockReturnValue({ router: mockRouter })
    const mockedError = new Error('Error')

    mockAxiosApi.mockRejectedValue(mockedError)

    const { result } = renderHook(() => useGiftPresent())

    await act(async () => {
      await result.current(mockSendGiftObj.giftID, mockSendGiftObj.quantity)
    })
    expect(mockAxiosErrorHandler).toHaveBeenCalledWith({
      route: { router: mockRouter },
      error: mockedError,
    })
  })
})
