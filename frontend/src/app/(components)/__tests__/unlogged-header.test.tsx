import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest'
import { useGeneralStore } from '@/stores/general/general.provider'
import userEvent from '@testing-library/user-event'
import UnLoggedHeader from '../headers/unlogged-header'

vi.mock('@/stores/general/general.provider')

const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>
const mockSetStatusMessage = vi.fn()

describe('UnLoggedHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockUseGeneralStore.mockReturnValue({
      setStatusMessage: mockSetStatusMessage,
    })
  })

  it('renders the initial state correctly', () => {
    render(<UnLoggedHeader />)
    const logo = screen.getByTestId('unlogged-header-logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('href', '/')
    expect(screen.getByTestId('unlogged-menu-trigger')).toBeInTheDocument()
  })

  it('opens the menu and shows expected links', async () => {
    render(<UnLoggedHeader />)
    const trigger = screen.getByTestId('unlogged-menu-trigger')
    await userEvent.click(trigger)

    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
    expect(screen.getByText('About Us')).toBeInTheDocument()

    expect(screen.getByText('Sign In').closest('a')).toHaveAttribute(
      'href',
      '/',
    )
    expect(screen.getByText('Sign Up').closest('a')).toHaveAttribute(
      'href',
      '/registerPage',
    )
    expect(screen.getByText('About Us').closest('a')).toHaveAttribute(
      'href',
      '/aboutPage',
    )
  })

  it('calls setStatusMessage("") when clicking on a link', async () => {
    render(<UnLoggedHeader />)
    const trigger = screen.getByTestId('unlogged-menu-trigger')
    await userEvent.click(trigger)

    const signUpLink = screen.getByText('Sign Up')

    expect(signUpLink).toBeInTheDocument()
    await userEvent.click(signUpLink)

    expect(mockSetStatusMessage).toHaveBeenCalledWith('')
  })
})
