import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { AxiosApi } from '@/common/axios-api/axios-api'
import { useGeneralStore } from '@/stores/general/general.provider'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import { useParams, useRouter } from 'next/navigation'
import { describe, expect, it, Mock, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { giftListMocks } from '@/app/portal/giftList/[id]/__mocks__/gift-list-mocks'
import useGetGiftedProducts from '../useGetGiftedProducts'

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
const mockUseParams = useParams as Mock

describe('useGetGiftedProducts', () => {
  it('calls the hook successfully and populates the stores', async () => {
    const mockSetGiftedProducts = vi.fn()
    const mockSetListHeader = vi.fn()
    mockUseGiftsStore.mockReturnValue({
      setListHeader: mockSetListHeader,
      setGiftedProducts: mockSetGiftedProducts,
    })

    const mockSetIsRendering = vi.fn()
    mockUseGeneralStore.mockReturnValue({
      setIsRendering: mockSetIsRendering,
    })

    mockUseParams.mockReturnValue({ id: giftListMocks.listHeader.weddingId })

    const mockResponseObject = {
      listHeader: giftListMocks.listHeader,
      mappingAddGifter: giftListMocks.mappingAddGifter,
    }

    mockAxiosApi.mockResolvedValueOnce({
      status: 200,
      data: {
        giftedProducts: mockResponseObject,
      },
    })

    const { result } = renderHook(() => useGetGiftedProducts())

    await act(async () => {
      await result.current()
    })

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'get',
      route: '/gifts/gifted-products',
      params: { id: giftListMocks.listHeader.weddingId },
    })

    expect(mockSetIsRendering).toHaveBeenNthCalledWith(1, true)
    expect(mockSetGiftedProducts).toHaveBeenCalledWith(
      mockResponseObject.mappingAddGifter,
    )
    expect(mockSetListHeader).toHaveBeenCalledWith(
      mockResponseObject.listHeader,
    )
    expect(mockSetIsRendering).toHaveBeenNthCalledWith(2, false)
  })

  it('mocks a situation where the api returns an error', async () => {
    const mockRouter = vi.fn()
    mockUseRouter.mockReturnValue({ router: mockRouter })
    mockUseParams.mockReturnValue({ id: giftListMocks.listHeader.weddingId })
    const mockSetIsRendering = vi.fn()
    mockUseGeneralStore.mockReturnValue({ setIsRendering: mockSetIsRendering })
    const mockedError = new Error('Error')

    mockAxiosApi.mockRejectedValue(mockedError)

    const { result } = renderHook(() => useGetGiftedProducts())

    await act(async () => {
      await result.current()
    })

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'get',
      route: '/gifts/gifted-products',
      params: { id: giftListMocks.listHeader.weddingId },
    })
    expect(mockSetIsRendering).toHaveBeenNthCalledWith(1, true)
    expect(mockAxiosErrorHandler).toHaveBeenCalledWith({
      route: { router: mockRouter },
      error: mockedError,
    })
    expect(mockSetIsRendering).toHaveBeenNthCalledWith(2, false)
  })
})
