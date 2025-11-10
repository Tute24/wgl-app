import { useGeneralStore } from '@/stores/general/general.provider'
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, Mock, vi } from 'vitest'
import useSendPasswordResetRequest from '../useSendPasswordResetRequest'
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import axios from 'axios'

vi.mock('@/common/axios-api/axios-api')
vi.mock('axios')
vi.mock('@/stores/general/general.provider')
vi.mock('@/app/(auxiliary-functions)/axios-error-handler')

const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>
const mockAxiosPost = axios.post as unknown as Mock
const mockAxiosErrorHandler = AxiosErrorHandler as Mock

const mockData = {
  email: 'example@test.com',
}

describe('useSendPasswordResetRequest', () => {
  it('should call the hook successfully', async () => {
    mockAxiosPost.mockResolvedValueOnce({
      status: 200,
    })

    process.env.NEXT_PUBLIC_API_URL = 'https://mockapi.com'

    const mockSetStatusMessage = vi.fn()
    const mockSetIsLoading = vi.fn()
    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: mockSetStatusMessage,
      setIsLoading: mockSetIsLoading,
    })

    const { result } = renderHook(() => useSendPasswordResetRequest())

    await act(async () => {
      await result.current(mockData)
    })

    expect(mockSetIsLoading).toHaveBeenNthCalledWith(1, true)
    expect(mockAxiosPost).toHaveBeenCalledWith(
      'https://mockapi.com/auth/forgot-password',
      mockData,
    )
    expect(mockSetStatusMessage).toHaveBeenCalledWith(
      'If an account with that email exists, a password reset link has been sent. Please check your inbox.',
    )
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(2, false)
  })

  it('mocks a situation where the api returns an error', async () => {
    const mockedError = new Error('Error')
    mockAxiosPost.mockRejectedValueOnce(mockedError)

    process.env.NEXT_PUBLIC_API_URL = 'https://mockapi.com'

    const mockSetIsLoading = vi.fn()
    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: vi.fn(),
      setIsLoading: mockSetIsLoading,
    })

    const { result } = renderHook(() => useSendPasswordResetRequest())

    await act(async () => {
      await result.current(mockData)
    })

    expect(mockSetIsLoading).toHaveBeenNthCalledWith(1, true)
    expect(mockAxiosPost).toHaveBeenCalledWith(
      'https://mockapi.com/auth/forgot-password',
      mockData,
    )
    expect(mockAxiosErrorHandler).toHaveBeenCalledWith({
      error: mockedError,
    })
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(2, false)
  })
})
