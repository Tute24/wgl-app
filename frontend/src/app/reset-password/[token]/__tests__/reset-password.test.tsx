import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, vi, Mock, beforeEach, expect } from 'vitest'
import ResetPassword from '../page'
import useSubmitPasswordReset from '../(hooks)/useSubmitPasswordReset'
import { useGeneralStore } from '@/stores/general/general.provider'
import userEvent from '@testing-library/user-event'

vi.mock('../(hooks)/useSubmitPasswordReset')
vi.mock('@/stores/general/general.provider')

const mockUseSubmitPasswordReset = useSubmitPasswordReset as Mock<
  typeof useSubmitPasswordReset
>
const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>

describe('<ResetPassword />', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders correctly', () => {
    mockUseSubmitPasswordReset.mockReturnValue(vi.fn())
    mockUseGeneralStore.mockReturnValue({
      statusMessage: '',
      isLoading: false,
    })

    render(<ResetPassword />)

    expect(screen.getByText(/Password Reset/i)).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(/Your new password here/i),
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(/Confirm your password here/i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Reset Password/i }),
    ).toBeInTheDocument()
  })

  it('submits successfully and shows success message', async () => {
    const mockSubmit = vi.fn()
    mockUseSubmitPasswordReset.mockReturnValue(mockSubmit)
    mockUseGeneralStore.mockReturnValue({
      statusMessage:
        'Your password was updated successfully. Go back to the sign in page.',
      isLoading: false,
    })

    render(<ResetPassword />)

    const passwordInput = screen.getByPlaceholderText(/Your new password here/i)
    const confirmInput = screen.getByPlaceholderText(
      /Confirm your password here/i,
    )
    const button = screen.getByRole('button', { name: /Reset Password/i })

    fireEvent.change(passwordInput, { target: { value: 'Valid123!' } })
    fireEvent.change(confirmInput, { target: { value: 'Valid123!' } })
    await userEvent.click(button)

    expect(mockSubmit).toHaveBeenCalledWith({
      password: 'Valid123!',
      confirmPassword: 'Valid123!',
    })

    expect(
      screen.getByText(
        /Your password was updated successfully\. Go back to the sign in page\./i,
      ),
    ).toBeInTheDocument()
  })

  it('shows validation error for invalid password (too short or missing requirements)', async () => {
    mockUseSubmitPasswordReset.mockReturnValue(vi.fn())
    mockUseGeneralStore.mockReturnValue({
      statusMessage: '',
      isLoading: false,
    })

    render(<ResetPassword />)

    const passwordInput = screen.getByPlaceholderText(/Your new password here/i)
    const confirmInput = screen.getByPlaceholderText(
      /Confirm your password here/i,
    )
    const button = screen.getByRole('button', { name: /Reset Password/i })

    fireEvent.change(passwordInput, { target: { value: 'abc' } })
    fireEvent.change(confirmInput, { target: { value: 'abc' } })
    await userEvent.click(button)

    expect(
      screen.getByText(
        /Password must be at least 8 characters long, include one uppercase letter, one number, and one special character./i,
      ),
    ).toBeInTheDocument()
  })

  it('shows validation error when passwords do not match', async () => {
    mockUseSubmitPasswordReset.mockReturnValue(vi.fn())
    mockUseGeneralStore.mockReturnValue({
      statusMessage: '',
      isLoading: false,
    })

    render(<ResetPassword />)

    const passwordInput = screen.getByPlaceholderText(/Your new password here/i)
    const confirmInput = screen.getByPlaceholderText(
      /Confirm your password here/i,
    )
    const button = screen.getByRole('button', { name: /Reset Password/i })

    fireEvent.change(passwordInput, { target: { value: 'Valid123!' } })
    fireEvent.change(confirmInput, { target: { value: 'Different123!' } })
    await userEvent.click(button)

    expect(screen.getByText(/Passwords must be equal!/i)).toBeInTheDocument()
  })
})
