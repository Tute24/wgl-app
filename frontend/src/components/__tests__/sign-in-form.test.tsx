import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { useGeneralStore } from '@/stores/general/general.provider';
import useSignIn from '@/app/(auxiliary-functions)/hooks/useSignIn';
import SignInForm from '../Forms/sign-in-form';

vi.mock('@/stores/general/general.provider');
vi.mock('@/app/(auxiliary-functions)/hooks/useSignIn');

const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>;
const mockUseSignIn = useSignIn as Mock<typeof useSignIn>;
const mockOnSubmit = vi.fn();

describe('SignInForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSignIn.mockReturnValue(mockOnSubmit);
    mockUseGeneralStore.mockReturnValue({
      statusMessage: '',
    });
  });

  it('renders form elements and checks links', () => {
    render(<SignInForm />);

    expect(screen.getByText('Sign in to your account below')).toBeInTheDocument();
    expect(screen.getByText(/enter your e-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();

    const signUpLink = screen.getByRole('link', { name: /sign up now!/i });
    expect(signUpLink).toHaveAttribute('href', '/registerPage');
  });

  it('submits the form successfully with valid credentials', async () => {
    render(<SignInForm />);
    const emailInput = screen.getByPlaceholderText(/your e-mail here/i);
    const passwordInput = screen.getByPlaceholderText(/your password here/i);
    const button = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'Test1234!');
    await userEvent.click(button);

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
