import { useGeneralStore } from '@/stores/general/general.provider'
import { useWeddingsStore } from '@/stores/weddings/weddings.provider'
import { describe, expect, it, Mock, vi } from 'vitest'
import WeddingsOwn from '../weddingsDisplay/own-weddings'
import { render, screen } from '@testing-library/react'
import { weddingsMock } from '../../__mocks__/weddingsMock'

vi.mock('@/stores/general/general.provider')
vi.mock('@/stores/weddings/weddings.provider')
vi.mock('next/navigation')

const mockUseWeddingsStore = useWeddingsStore as Mock<typeof useWeddingsStore>
const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>

describe('WeddingsDisplay', () => {
  it('should render loading component if hasHydrated is false', () => {
    mockUseWeddingsStore.mockReturnValue({ hasHydrated: false })
    mockUseGeneralStore.mockReturnValue({
      isRendering: false,
    })
    render(<WeddingsOwn />)
    expect(screen.getByTestId('clip-loader')).toBeInTheDocument()
  })

  it('should render loading component if isRendering is true', () => {
    mockUseWeddingsStore.mockReturnValue({ hasHydrated: true })
    mockUseGeneralStore.mockReturnValue({
      isRendering: true,
    })
    render(<WeddingsOwn />)
    expect(screen.getByTestId('clip-loader')).toBeInTheDocument()
  })

  it('should show no weddings message if there are no weddings to exhibit', () => {
    mockUseWeddingsStore.mockReturnValue({ hasHydrated: true, ownWeddings: [] })
    mockUseGeneralStore.mockReturnValue({
      isRendering: false,
    })
    render(<WeddingsOwn />)

    expect(
      screen.getByText('There are no weddings to exhibit at this section.'),
    ).toBeVisible()
  })

  it('should show display the wedding card if ownWeddings is not an empty array', () => {
    mockUseWeddingsStore.mockReturnValue({
      hasHydrated: true,
      ownWeddings: [weddingsMock.ownWeddings],
    })
    mockUseGeneralStore.mockReturnValue({
      isRendering: false,
    })

    render(<WeddingsOwn />)

    expect(
      screen.getByTestId(`wedding-${weddingsMock.ownWeddings.id}`),
    ).toBeInTheDocument()
    expect(
      screen.getByText(weddingsMock.ownWeddings.weddingTitle),
    ).toBeVisible()
  })
})
