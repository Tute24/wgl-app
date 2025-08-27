import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { AxiosApi } from '@/common/axios-api/axios-api'
import { useGeneralStore } from '@/stores/general/general.provider'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import { useParams, useRouter } from 'next/navigation'
import { describe, expect, it, Mock, vi } from 'vitest'
import { giftListMocks } from '../../__mocks__/gift-list-mocks'
import { act, renderHook } from '@testing-library/react'
import useGetGifts from '../useGetGifts'

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

describe('useGetGifts', () => {
  it('calls the hook successfully and populates the zustand stores', async () => {
    const mockSetWeddingGifts = vi.fn()
    const mockSetListHeader = vi.fn()
    const mockSetIsCreator = vi.fn()
    const mockSetIsGuest = vi.fn()
    mockUseGiftsStore.mockReturnValue({
      setWeddingGifts: mockSetWeddingGifts,
      setListHeader: mockSetListHeader,
      setIsCreator: mockSetIsCreator,
      setIsGuest: mockSetIsGuest,
    })

    const mockSetIsRendering = vi.fn()
    mockUseGeneralStore.mockReturnValue({
      setIsRendering: mockSetIsRendering,
    })

    mockUseParams.mockReturnValue({ id: giftListMocks.listHeader.weddingId })

    const mockResponseObject = {
      checkPreferences: {
        isCreator: true,
        isGuest: false,
      },
      listHeader: giftListMocks.listHeader,
      weddingGifts: giftListMocks.weddingGifts,
    }

    mockAxiosApi.mockResolvedValueOnce({
      status: 200,
      data: {
        responseObject: mockResponseObject,
      },
    })

    const { result } = renderHook(() => useGetGifts())

    await act(async () => {
      await result.current()
    })

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'get',
      route: '/gifts/get',
      params: { id: giftListMocks.listHeader.weddingId },
    })
    expect(mockSetIsRendering).toHaveBeenNthCalledWith(1, true)
    expect(mockSetIsCreator).toHaveBeenCalledWith(
      mockResponseObject.checkPreferences.isCreator,
    )
    expect(mockSetIsGuest).toHaveBeenCalledWith(
      mockResponseObject.checkPreferences.isGuest,
    )
    expect(mockSetListHeader).toHaveBeenCalledWith(giftListMocks.listHeader)
    expect(mockSetWeddingGifts).toHaveBeenCalledWith(giftListMocks.weddingGifts)
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

    const { result } = renderHook(() => useGetGifts())

    await act(async () => {
      await result.current()
    })

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'get',
      route: '/gifts/get',
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
