import { axiosInstance } from '@/common/axios-api/axios-api'
import { authStoreInstance } from '@/stores/auth/auth.provider'
import { useGeneralStore } from '@/stores/general/general.provider'
import { act, renderHook } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { describe, expect, it, Mock, vi } from 'vitest'
import useSignIn from '../useSignIn'

vi.mock('@/common/axios-api/axios-api')
vi.mock('@/stores/general/general.provider')
vi.mock('next/navigation')
vi.mock('@/stores/auth/auth.provider', () => ({
  authStoreInstance: {
    getState: vi.fn(),
  },
}))

const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>
const mockUseRouter = useRouter as Mock
const mockAxiosInstancePost = axiosInstance.post as unknown as Mock
const mockAuthStoreInstanceGetState =
  authStoreInstance.getState as unknown as Mock

const mockData = {
  email: 'example@test.com',
  password: 'Teste123!',
}

describe('useSignIn', () => {
  it('should call the useSignIn hook successfully', async () => {
    mockAxiosInstancePost.mockResolvedValueOnce({
      status: 200,
      data: {
        token: 'fake-token',
        username: 'fake-username',
      },
    })

    const mockSetStatusMessage = vi.fn()
    const mockSetUsername = vi.fn()
    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: mockSetStatusMessage,
      setUsername: mockSetUsername,
    })

    const mockRouterPush = vi.fn()
    mockUseRouter.mockReturnValue({ push: mockRouterPush })

    const mockSetToken = vi.fn()
    mockAuthStoreInstanceGetState.mockReturnValue({ setToken: mockSetToken })

    const { result } = renderHook(() => useSignIn())

    await act(async () => {
      await result.current(mockData)
    })

    expect(mockAxiosInstancePost).toHaveBeenCalledWith(
      '/auth/sign-in',
      mockData,
    )
    expect(mockSetUsername).toHaveBeenCalledWith('fake-username')
    expect(mockSetToken).toHaveBeenCalledWith('fake-token')
    expect(mockRouterPush).toHaveBeenCalledWith('/portal/dashboard')
  })

  it('handles 404 error', async () => {
    const error404 = {
      response: { status: 404 },
      isAxiosError: true,
    }
    mockAxiosInstancePost.mockRejectedValue(error404)

    const mockSetStatusMessage = vi.fn()
    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: mockSetStatusMessage,
    })

    const { result } = renderHook(() => useSignIn())

    await act(async () => {
      await result.current(mockData)
    })

    expect(mockAxiosInstancePost).toHaveBeenCalledWith(
      '/auth/sign-in',
      mockData,
    )
    expect(mockSetStatusMessage).toHaveBeenCalledWith(
      `This email doesn't belong to an existent user.`,
    )
  })

  it('handles 401 error', async () => {
    const error401 = {
      response: { status: 401 },
      isAxiosError: true,
    }
    mockAxiosInstancePost.mockRejectedValue(error401)

    const mockSetStatusMessage = vi.fn()
    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: mockSetStatusMessage,
    })

    const { result } = renderHook(() => useSignIn())

    await act(async () => {
      await result.current(mockData)
    })

    expect(mockAxiosInstancePost).toHaveBeenCalledWith(
      '/auth/sign-in',
      mockData,
    )
    expect(mockSetStatusMessage).toHaveBeenCalledWith(
      `Incorrect password. Try again!`,
    )
  })

  it('handles 500 error', async () => {
    const error500 = {
      response: { status: 500 },
      isAxiosError: true,
    }
    mockAxiosInstancePost.mockRejectedValue(error500)

    const mockSetStatusMessage = vi.fn()
    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: mockSetStatusMessage,
    })

    const { result } = renderHook(() => useSignIn())

    await act(async () => {
      await result.current(mockData)
    })

    expect(mockAxiosInstancePost).toHaveBeenCalledWith(
      '/auth/sign-in',
      mockData,
    )
    expect(mockSetStatusMessage).toHaveBeenCalledWith(
      `Something went wrong. Try again!`,
    )
  })
})
