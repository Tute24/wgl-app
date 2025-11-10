import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { AxiosApi } from '@/common/axios-api/axios-api'
import { useGeneralStore } from '@/stores/general/general.provider'
import { useRouter } from 'next/navigation'
import { describe, expect, it, Mock, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useWeddingsStore } from '@/stores/weddings/weddings.provider'
import { mockNewList, mockWedding } from '../../__mocks__/weddingsMock'
import useSubmitList from '../useSubmitList'
import { WeddingsProps } from '@/stores/weddings/weddings.store'

vi.mock('@/app/(auxiliary-functions)/axios-error-handler')
vi.mock('@/common/axios-api/axios-api')
vi.mock('@/stores/general/general.provider')
vi.mock('@/stores/weddings/weddings.provider')
vi.mock('next/navigation')

const mockUseWeddingsStore = useWeddingsStore as Mock<typeof useWeddingsStore>
const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>
const mockAxiosApi = AxiosApi as Mock
const mockAxiosErrorHandler = AxiosErrorHandler as Mock
const mockUseRouter = useRouter as Mock

describe('useSubmitList', () => {
  it('calls the hook successfully and populates the zustand stores', async () => {
    const mockSetStatusMessage = vi.fn()
    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: mockSetStatusMessage,
    })

    const mockSetOwnWeddings = vi.fn()
    const mockOwnWeddings: WeddingsProps[] = []
    mockUseWeddingsStore.mockReturnValue({
      setOwnWeddings: mockSetOwnWeddings,
      ownWeddings: mockOwnWeddings,
    })

    mockAxiosApi.mockReturnValue({
      status: 200,
      data: {
        newlyCreatedWedding: mockWedding,
      },
    })

    const { result } = renderHook(() => useSubmitList())

    await act(async () => {
      await result.current(mockNewList)
    })

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'post',
      route: '/weddings/create',
      data: mockNewList,
    })

    expect(mockSetOwnWeddings).toHaveBeenCalledWith([
      ...mockOwnWeddings,
      mockWedding,
    ])
    expect(mockSetStatusMessage).toHaveBeenCalledWith(
      'Wedding created successfully!',
    )
  })

  it('mocks a situation where the api returns an error', async () => {
    const mockSetStatusMessage = vi.fn()
    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: mockSetStatusMessage,
    })

    const mockRouter = vi.fn()
    mockUseRouter.mockReturnValue({ router: mockRouter })
    const mockedError = new Error('Error')

    mockAxiosApi.mockRejectedValue(mockedError)

    const { result } = renderHook(() => useSubmitList())

    await act(async () => {
      await result.current(mockNewList)
    })

    expect(mockAxiosApi).toHaveBeenCalledWith({
      httpMethod: 'post',
      route: '/weddings/create',
      data: mockNewList,
    })
    expect(mockAxiosErrorHandler).toHaveBeenCalledWith({
      route: { router: mockRouter },
      error: mockedError,
      setStatusMessage: mockSetStatusMessage,
    })
  })
})
