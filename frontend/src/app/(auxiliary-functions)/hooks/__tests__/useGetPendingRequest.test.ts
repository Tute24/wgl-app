import { describe, it, expect, vi, Mock } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useGeneralStore } from '@/stores/general/general.provider'
import { AxiosApi } from '@/common/axios-api/axios-api'

import { useGetPendingRequests } from '../useGetPendingRequests'
import AxiosErrorHandler from '../../axios-error-handler'

vi.mock('@/stores/general/general.provider')
vi.mock('@/common/axios-api/axios-api')
vi.mock('../../axios-error-handler')

const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>
const mockAxiosApi = AxiosApi as Mock
const mockAxiosErrorHandler = AxiosErrorHandler as Mock

describe('useGetPendingRequests', () => {
  it('should call the API and set the pending requests when successful', async () => {
    const mockSetPendingRequests = vi.fn()

    mockUseGeneralStore.mockReturnValue({
      setPendingRequests: mockSetPendingRequests,
    })

    const mockPendingRequests = 5

    mockAxiosApi.mockResolvedValueOnce({
      status: 200,
      data: { pendingRequests: mockPendingRequests },
    })

    const { result } = renderHook(() => useGetPendingRequests())

    await act(async () => {
      await result.current()
    })

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'get',
      route: '/requests/pending-requests',
    })
    expect(mockSetPendingRequests).toHaveBeenCalledWith(mockPendingRequests)
  })

  it('should handle errors by calling AxiosErrorHandler', async () => {
    const mockSetPendingRequests = vi.fn()
    const mockedError = new Error('API Error')

    mockUseGeneralStore.mockReturnValue({
      setPendingRequests: mockSetPendingRequests,
    })
    mockAxiosApi.mockRejectedValueOnce(mockedError)

    const { result } = renderHook(() => useGetPendingRequests())

    await act(async () => {
      await result.current()
    })

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'get',
      route: '/requests/pending-requests',
    })
    expect(mockAxiosErrorHandler).toHaveBeenCalledWith({ error: mockedError })
    expect(mockSetPendingRequests).not.toHaveBeenCalled()
  })
})
