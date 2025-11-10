import { useGeneralStore } from '@/stores/general/general.provider'
import { useRequestsStore } from '@/stores/requests/requests.provider'
import { describe, expect, it, Mock, vi } from 'vitest'
import useGetRequests from '../(hooks)/useGetRequests'
import RequestsHistoryPage from '../page'
import { render, screen } from '@testing-library/react'

vi.mock('@/stores/general/general.provider')
vi.mock('@/stores/requests/requests.provider')
vi.mock('../(hooks)/useGetRequests')

const useMockGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>
const useMockRequestsStore = useRequestsStore as Mock<typeof useRequestsStore>
const mockUseGetRequests = useGetRequests as Mock

describe('RequestsHistoryPage', () => {
  it('should load the clip loader when hasHydrate is false', () => {
    useMockGeneralStore.mockReturnValue({
      isRendering: false,
    })

    useMockRequestsStore.mockReturnValue({
      hasHydrated: false,
      requests: [],
      filteredRequests: [],
      setFilteredRequests: vi.fn(),
    })

    const mockGetRequests = vi.fn()
    mockUseGetRequests.mockReturnValue(mockGetRequests)

    render(<RequestsHistoryPage />)
    expect(screen.getByTestId('clip-loader-requests')).toBeInTheDocument()
    expect(mockGetRequests).toHaveBeenCalled()
  })

  it('should load the clip loader when isRendering is true', () => {
    useMockGeneralStore.mockReturnValue({
      isRendering: true,
    })

    useMockRequestsStore.mockReturnValue({
      hasHydrated: true,
      requests: [],
      filteredRequests: [],
      setFilteredRequests: vi.fn(),
    })

    const mockGetRequests = vi.fn()
    mockUseGetRequests.mockReturnValue(mockGetRequests)

    render(<RequestsHistoryPage />)
    expect(screen.getByTestId('clip-loader-requests')).toBeInTheDocument()
    expect(mockGetRequests).toHaveBeenCalled()
  })

  it('should render correctly when theres no requests', () => {
    useMockGeneralStore.mockReturnValue({
      isRendering: false,
    })

    useMockRequestsStore.mockReturnValue({
      hasHydrated: true,
      requests: [],
      filteredRequests: [],
      setFilteredRequests: vi.fn(),
    })

    const mockGetRequests = vi.fn()
    mockUseGetRequests.mockReturnValue(mockGetRequests)

    render(<RequestsHistoryPage />)
    expect(mockGetRequests).toHaveBeenCalled()
    expect(
      screen.getByText('No requests to show at the moment.'),
    ).toBeInTheDocument()
  })
})
