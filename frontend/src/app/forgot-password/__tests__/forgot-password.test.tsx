import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, Mock, expect, beforeEach } from 'vitest';
import SendMail from '../page';
import useSendPasswordResetRequest from '../(hooks)/useSendPasswordResetRequest';
import { useGeneralStore } from '@/stores/general/general.provider';
import userEvent from '@testing-library/user-event';

vi.mock('../(hooks)/useSendPasswordResetRequest');
vi.mock('@/stores/general/general.provider');

const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>;
const mockUseSendPasswordResetRequest = useSendPasswordResetRequest as Mock<
  typeof useSendPasswordResetRequest
>;

describe('<SendMail />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly', () => {
    mockUseGeneralStore.mockReturnValue({
      statusMessage: '',
      isLoading: false,
    });
    mockUseSendPasswordResetRequest.mockReturnValue(vi.fn());

    render(<SendMail />);

    expect(screen.getByText(/Forgot Your Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your e-mail here/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
  });

  it('submits the form successfully and shows the status message', async () => {
    const mockSend = vi.fn();
    mockUseSendPasswordResetRequest.mockReturnValue(mockSend);

    mockUseGeneralStore.mockReturnValue({
      statusMessage:
        'If an account with that email exists, a password reset link has been sent. Please check your inbox.',
      isLoading: false,
    });

    render(<SendMail />);

    const input = screen.getByPlaceholderText(/Your e-mail here/i);
    const button = screen.getByRole('button', { name: /confirm/i });

    fireEvent.change(input, { target: { value: 'example@test.com' } });
    await userEvent.click(button);

    expect(mockSend).toHaveBeenCalledWith({ email: 'example@test.com' });

    expect(
      screen.getByText(
        /If an account with that email exists, a password reset link has been sent/i,
      ),
    ).toBeInTheDocument();
  });

  it('shows validation error when submitting invalid email', async () => {
    mockUseSendPasswordResetRequest.mockReturnValue(vi.fn());

    mockUseGeneralStore.mockReturnValue({
      statusMessage: '',
      isLoading: false,
    });

    render(<SendMail />);

    const input = screen.getByPlaceholderText(/Your e-mail here/i);
    const button = screen.getByRole('button', { name: /confirm/i });

    fireEvent.change(input, { target: { value: 'invalid-email' } });
    await userEvent.click(button);

    expect(screen.getByText(/Enter a valid e-mail address/i)).toBeInTheDocument();
  });
});
