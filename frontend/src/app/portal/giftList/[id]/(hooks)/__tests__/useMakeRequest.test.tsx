import { describe, expect, it, Mock, vi } from 'vitest'
import { useGeneralStore } from '@/stores/general/general.provider'
import { AxiosApi } from '@/common/axios-api/axios-api'
import { act, renderHook } from '@testing-library/react'
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { useRouter } from 'next/navigation'
import { giftListMocks } from '../../__mocks__/gift-list-mocks'
import useMakeRequest from '../useMakeRequest'

vi.mock('@/common/axios-api/axios-api')
vi.mock('@/stores/general/general.provider')
vi.mock('next/navigation')
vi.mock('@/app/(auxiliary-functions)/axios-error-handler')

const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>
const mockAxiosApi = AxiosApi as Mock
const mockAxiosErrorHandler = AxiosErrorHandler as Mock
const mockUseRouter = useRouter as Mock

describe('useMakeRequest', () => {
  const weddingId = giftListMocks.listHeader.weddingId
  it('should call the hook correctly and make a sucessfull request', async () => {
    const mockSetStatusMessage = vi.fn()
    const mockSetIsLoading = vi.fn()
    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: mockSetStatusMessage,
      setIsLoading: mockSetIsLoading,
    })

    mockAxiosApi.mockResolvedValueOnce({
      status: 200,
    })

    const { result } = renderHook(() => useMakeRequest(weddingId))

    await act(async () => {
      await result.current()
    })

    expect(mockSetIsLoading).toHaveBeenNthCalledWith(1, true)
    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'post',
      route: '/requests/make',
      data: {
        weddingID: weddingId,
      },
    })
    expect(mockSetStatusMessage).toHaveBeenCalledWith(
      `Request made successfully! If the wedding list's admin accepts your request, you'll be able to see the list soon.`,
    )
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(2, false)
  })

  it('mocks a situation where the api returns an error', async () => {
    const mockRouter = vi.fn()
    mockUseRouter.mockReturnValue({ router: mockRouter })
    const mockSetStatusMessage = vi.fn()
    const mockSetIsLoading = vi.fn()
    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: mockSetStatusMessage,
      setIsLoading: mockSetIsLoading,
    })
    const mockedError = new Error('Error')

    mockAxiosApi.mockRejectedValue(mockedError)

    const { result } = renderHook(() => useMakeRequest(weddingId))

    await act(async () => {
      await result.current()
    })

    expect(mockSetIsLoading).toHaveBeenNthCalledWith(1, true)
    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'post',
      route: '/requests/make',
      data: {
        weddingID: weddingId,
      },
    })
    expect(mockAxiosErrorHandler).toHaveBeenCalledWith({
      route: { router: mockRouter },
      error: mockedError,
      setStatusMessage: mockSetStatusMessage,
    })
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(2, false)
  })
})
