import { describe, expect, it, Mock, vi } from 'vitest'
import { useWeddingsStore } from '@/stores/weddings/weddings.provider'
import { useGeneralStore } from '@/stores/general/general.provider'
import { AxiosApi } from '@/common/axios-api/axios-api'
import { weddingsMock } from '../../__mocks__/weddingsMock'
import { act, renderHook } from '@testing-library/react'
import useGetWeddings from '../useGetWeddings'
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { useRouter } from 'next/navigation'

vi.mock('@/common/axios-api/axios-api')
vi.mock('@/stores/weddings/weddings.provider')
vi.mock('@/stores/general/general.provider')
vi.mock('next/navigation')
vi.mock('@/app/(auxiliary-functions)/axios-error-handler')

const mockUseWeddingsStore = useWeddingsStore as Mock<typeof useWeddingsStore>
const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>
const mockAxiosApi = AxiosApi as Mock
const mockAxiosErrorHandler = AxiosErrorHandler as Mock
const mockUseRouter = useRouter as Mock

describe('useGetWeddings', () => {
  it('calls the hook successfully and populates the zustand states', async () => {
    const mockSetOwnWeddings = vi.fn()
    const mockSetInvitedWeddings = vi.fn()
    mockUseWeddingsStore.mockReturnValue({
      setOwnWeddings: mockSetOwnWeddings,
      setInvitedWeddings: mockSetInvitedWeddings,
    })

    const mockSetIsRendering = vi.fn()
    mockUseGeneralStore.mockReturnValue({ setIsRendering: mockSetIsRendering })

    mockAxiosApi.mockResolvedValueOnce({
      status: 200,
      data: {
        ownWeddings: [weddingsMock.ownWeddings],
        guestWeddings: [weddingsMock.guestWeddings],
      },
    })

    const { result } = renderHook(() => useGetWeddings())

    await act(async () => {
      await result.current()
    })
    expect(mockSetIsRendering).toHaveBeenNthCalledWith(1, true)
    expect(mockSetOwnWeddings).toHaveBeenCalledWith([weddingsMock.ownWeddings])
    expect(mockSetInvitedWeddings).toHaveBeenCalledWith([
      weddingsMock.guestWeddings,
    ])
    expect(mockSetIsRendering).toHaveBeenNthCalledWith(2, false)
  })

  it('mocks a situation where the api returns an error', async () => {
    const mockRouter = vi.fn()
    mockUseRouter.mockReturnValue({ router: mockRouter })
    const mockSetIsRendering = vi.fn()
    mockUseGeneralStore.mockReturnValue({ setIsRendering: mockSetIsRendering })
    const mockedError = new Error('Error')

    mockAxiosApi.mockRejectedValue(mockedError)

    const { result } = renderHook(() => useGetWeddings())

    await act(async () => {
      await result.current()
    })
    expect(mockSetIsRendering).toHaveBeenNthCalledWith(1, true)
    expect(mockAxiosErrorHandler).toHaveBeenCalledWith({
      route: { router: mockRouter },
      error: mockedError,
    })
    expect(mockSetIsRendering).toHaveBeenNthCalledWith(2, false)
  })
})
