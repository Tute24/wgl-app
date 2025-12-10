import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { useGeneralStore } from '@/stores/general/general.provider';
import useLogOut from '@/app/(auxiliary-functions)/hooks/useSignOut';
import { useGetPendingRequests } from '@/app/(auxiliary-functions)/hooks/useGetPendingRequests';
import userEvent from '@testing-library/user-event';
import LoggedHeader from '@/app/(components)/headers/logged-header';

vi.mock('@/stores/general/general.provider');
vi.mock('@/app/(auxiliary-functions)/hooks/useSignOut');
vi.mock('@/app/(auxiliary-functions)/hooks/useGetPendingRequests');

const mockUseGeneralStore = useGeneralStore as Mock<typeof useGeneralStore>;
const mockUseSignOut = useLogOut as Mock<typeof useLogOut>;
const mockLogOut = vi.fn();
const mockUseGetPendingRequests = useGetPendingRequests as Mock<typeof useGetPendingRequests>;
const mockGetPendingRequests = vi.fn();

describe('LoggedHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseSignOut.mockReturnValue(mockLogOut);
    mockUseGetPendingRequests.mockReturnValue(mockGetPendingRequests);

    mockUseGeneralStore.mockReturnValue({
      username: 'John Doe',
      pendingRequests: 3,
    });
  });

  it('renders username and logo correctly', () => {
    render(<LoggedHeader />);

    expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();

    const logo = screen.getByTestId('logged-header-logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/portal/dashboard');

    const dashboardLink = screen.getByRole('link', {
      name: /Weddings Dashboard/i,
    });
    expect(dashboardLink).toHaveAttribute('href', '/portal/dashboard');
  });

  it('opens the menu and shows expected links', async () => {
    render(<LoggedHeader />);

    const trigger = screen.getByTestId('logged-menu-trigger');
    await userEvent.click(trigger);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Create new wedding')).toBeInTheDocument();
    expect(screen.getByText('Requests List')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();

    expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/portal/dashboard');
    expect(screen.getByText('Create new wedding').closest('a')).toHaveAttribute(
      'href',
      '/portal/createList',
    );
    expect(screen.getByText('Requests List').closest('a')).toHaveAttribute(
      'href',
      '/portal/requests-history',
    );
    expect(screen.getByText('About Us').closest('a')).toHaveAttribute('href', '/portal/about-page');
  });

  it('calls logOut when clicking "Sign Out"', async () => {
    render(<LoggedHeader />);

    const trigger = screen.getByTestId('logged-menu-trigger');
    await userEvent.click(trigger);

    expect(screen.getByText('Sign Out')).toBeInTheDocument();

    const signOutButton = screen.getByText('Sign Out');
    await userEvent.click(signOutButton);

    expect(mockLogOut).toHaveBeenCalled();
  });
});
