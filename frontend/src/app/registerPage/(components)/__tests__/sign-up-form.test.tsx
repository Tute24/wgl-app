import { useGeneralStore } from '@/stores/general/general.provider'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, Mock, vi } from 'vitest'
import RegisterForm from '../RegistrationForms/sign-up-form'
import useSubmitRegister from '../../(hooks)/useSubmitRegister'
import userEvent from '@testing-library/user-event'

vi.mock('@/stores/general/general.provider')
vi.mock('../../(hooks)/useSubmitRegister')

const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>
const mockUseSubmitRegister = useSubmitRegister as Mock

describe('RegisterForm', () => {
  it('should render the initial state of the component correctly', () => {
    const mockSubmitRegister = vi.fn()
    mockUseSubmitRegister.mockReturnValue(mockSubmitRegister)

    mockUseGeneralStore.mockReturnValue({
      statusMessage: '',
    })

    render(<RegisterForm />)

    expect(screen.getByText('Create your account below')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Your first name here'),
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Your last name here'),
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Enter a valid e-mail address'),
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Enter your password'),
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Confirm your password'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /sign up/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign in now!/i })).toHaveAttribute(
      'href',
      '/',
    )
  })

  it('should simulate the creation of a new user', async () => {
    const mockSubmitRegister = vi.fn()
    mockUseSubmitRegister.mockReturnValue(mockSubmitRegister)

    mockUseGeneralStore.mockReturnValue({
      statusMessage: '',
    })

    const mockData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'Teste123!',
      confirmPassword: 'Teste123!',
    }

    render(<RegisterForm />)

    const firstNameInput = screen.getByPlaceholderText('Your first name here')
    const lastNameInput = screen.getByPlaceholderText('Your last name here')
    const emailInput = screen.getByPlaceholderText(
      'Enter a valid e-mail address',
    )
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    const confirmPasswordInput = screen.getByPlaceholderText(
      'Confirm your password',
    )
    const signUpButton = screen.getByRole('button', {
      name: /sign up/i,
    })
    fireEvent.change(firstNameInput, {
      target: { value: mockData.firstName },
    })
    fireEvent.change(lastNameInput, {
      target: { value: mockData.lastName },
    })
    fireEvent.change(emailInput, {
      target: { value: mockData.email },
    })
    fireEvent.change(passwordInput, {
      target: { value: mockData.password },
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: mockData.confirmPassword },
    })

    await userEvent.click(signUpButton)
    expect(mockSubmitRegister).toHaveBeenCalledWith(mockData)
  })

  it('should not call submitRegister if the password doesnt obey the zod validation schema', async () => {
    const mockSubmitRegister = vi.fn()
    mockUseSubmitRegister.mockReturnValue(mockSubmitRegister)

    mockUseGeneralStore.mockReturnValue({
      statusMessage: '',
    })

    const mockData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: '12345',
      confirmPassword: '12345',
    }

    render(<RegisterForm />)

    const firstNameInput = screen.getByPlaceholderText('Your first name here')
    const lastNameInput = screen.getByPlaceholderText('Your last name here')
    const emailInput = screen.getByPlaceholderText(
      'Enter a valid e-mail address',
    )
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    const confirmPasswordInput = screen.getByPlaceholderText(
      'Confirm your password',
    )
    const signUpButton = screen.getByRole('button', {
      name: /sign up/i,
    })
    fireEvent.change(firstNameInput, {
      target: { value: mockData.firstName },
    })
    fireEvent.change(lastNameInput, {
      target: { value: mockData.lastName },
    })
    fireEvent.change(emailInput, {
      target: { value: mockData.email },
    })
    fireEvent.change(passwordInput, {
      target: { value: mockData.password },
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: mockData.confirmPassword },
    })

    await userEvent.click(signUpButton)
    expect(mockSubmitRegister).not.toHaveBeenCalled()
    expect(
      screen.getByText(
        'Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.',
      ),
    ).toBeInTheDocument()
  })
})
