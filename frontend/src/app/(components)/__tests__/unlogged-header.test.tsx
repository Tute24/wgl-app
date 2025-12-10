import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import UnLoggedHeader from '@/app/(components)/headers/unlogged-header';

describe('UnLoggedHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the initial state correctly', () => {
    render(<UnLoggedHeader />);
    const logo = screen.getByTestId('unlogged-header-logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
    expect(screen.getByTestId('unlogged-menu-trigger')).toBeInTheDocument();
  });

  it('opens the menu and shows expected links', async () => {
    render(<UnLoggedHeader />);
    const trigger = screen.getByTestId('unlogged-menu-trigger');
    await userEvent.click(trigger);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();

    expect(screen.getByText('Sign In').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Sign Up').closest('a')).toHaveAttribute('href', '/registerPage');
    expect(screen.getByText('About Us').closest('a')).toHaveAttribute('href', '/about-page');
  });
});
