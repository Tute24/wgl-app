import { useGeneralStore } from '@/stores/general/general.provider'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, Mock, vi } from 'vitest'
import TableSet from '../table-set'
import { giftListMocks } from '@/app/portal/giftList/[id]/__mocks__/gift-list-mocks'
import useGetGiftedProducts from '../../(hooks)/useGetGiftedProducts'

vi.mock('@/stores/general/general.provider')
vi.mock('@/stores/gifts/gifts.provider')
vi.mock('../../(hooks)/useGetGiftedProducts')

const mockUseGiftsStore = useGiftsStore as Mock<typeof useGiftsStore>
const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>
const mockUseGetGiftedProducts = useGetGiftedProducts as Mock

describe('TableSet', () => {
  it('should render the main ClipLoader if hasHydrated is false', () => {
    mockUseGiftsStore.mockReturnValue({
      hasHydrated: false,
    })
    mockUseGeneralStore.mockReturnValue({
      isRendering: false,
    })
    mockUseGetGiftedProducts.mockReturnValue(vi.fn())

    render(<TableSet />)

    expect(screen.getByTestId('clip-loader')).toBeInTheDocument()
  })

  it('should render the main ClipLoader if listHeader is null', () => {
    mockUseGiftsStore.mockReturnValue({
      listHeader: null,
      hasHydrated: true,
    })
    mockUseGeneralStore.mockReturnValue({
      isRendering: false,
    })
    mockUseGetGiftedProducts.mockReturnValue(vi.fn())

    render(<TableSet />)

    expect(screen.getByTestId('clip-loader')).toBeInTheDocument()
  })

  it('should render the table ClipLoader if isRendering is true', () => {
    mockUseGiftsStore.mockReturnValue({
      listHeader: giftListMocks.listHeader,
      hasHydrated: true,
    })
    mockUseGeneralStore.mockReturnValue({
      isRendering: true,
    })
    mockUseGetGiftedProducts.mockReturnValue(vi.fn())

    render(<TableSet />)

    expect(screen.getByTestId('clip-loader-table')).toBeInTheDocument()
  })
})
