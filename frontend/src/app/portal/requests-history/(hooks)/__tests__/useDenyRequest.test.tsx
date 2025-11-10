import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { AxiosApi } from '@/common/axios-api/axios-api'
import { useGeneralStore } from '@/stores/general/general.provider'
import { describe, expect, it, Mock, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useRequestsStore } from '@/stores/requests/requests.provider'
import { requestsResponseMock } from '../../__mocks__/requests-history-mock'
import { useDenyRequest } from '../useDenyRequest'

vi.mock('@/app/(auxiliary-functions)/axios-error-handler')
vi.mock('@/common/axios-api/axios-api')
vi.mock('@/stores/general/general.provider')
vi.mock('@/stores/requests/requests.provider')

const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>
const mockUseRequestsStore = useRequestsStore as Mock<typeof useRequestsStore>
const mockAxiosApi = AxiosApi as Mock
const mockAxiosErrorHandler = AxiosErrorHandler as Mock

describe('useAcceptRequest', () => {
  it('calls the hook successfully and populates the store properly', async () => {
    const mockSetRequests = vi.fn()
    const mockSetFilteredRequests = vi.fn()
    mockUseRequestsStore.mockReturnValue({
      setRequests: mockSetRequests,
      setFilteredRequests: mockSetFilteredRequests,
      requests: requestsResponseMock,
      filteredRequests: requestsResponseMock,
    })

    const reqID = 1

    const mockSetIsLoading = vi.fn()
    mockUseGeneralStore.mockReturnValue({
      setIsLoading: mockSetIsLoading,
    })

    mockAxiosApi.mockReturnValue({
      status: 200,
    })

    const { result } = renderHook(() => useDenyRequest())

    await act(async () => {
      await result.current(reqID)
    })

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'post',
      data: {
        reqID,
      },
      route: '/requests/deny',
    })

    expect(mockSetIsLoading).toHaveBeenNthCalledWith(1, true)
    expect(mockSetRequests).toHaveBeenCalledWith(
      requestsResponseMock.map((request) =>
        request.id === reqID
          ? { ...request, pending: false, accepted: false }
          : request,
      ),
    )
    expect(mockSetFilteredRequests).toHaveBeenCalledWith(
      requestsResponseMock.map((request) =>
        request.id === reqID
          ? { ...request, pending: false, accepted: false }
          : request,
      ),
    )
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(2, false)
  })

  it('mocks a situation where the api returns an error', async () => {
    const mockSetIsLoading = vi.fn()
    mockUseGeneralStore.mockReturnValue({ setIsLoading: mockSetIsLoading })
    const mockedError = new Error('Error')

    mockAxiosApi.mockRejectedValue(mockedError)

    const { result } = renderHook(() => useDenyRequest())

    await act(async () => {
      await result.current(1)
    })

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'post',
      data: {
        reqID: 1,
      },
      route: '/requests/deny',
    })

    expect(mockSetIsLoading).toHaveBeenNthCalledWith(1, true)
    expect(mockAxiosErrorHandler).toHaveBeenCalledWith({
      error: mockedError,
    })
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(2, false)
  })
})
