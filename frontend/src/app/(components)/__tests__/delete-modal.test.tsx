import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteModal, { deleteModalProps } from '../modals/delete-modal';

vi.mock('@/app/(components)/Common/spinner/spinner', () => ({
  Spinner: () => <div data-testid="spinner" />,
}));

describe('DeleteModal', () => {
  const defaultProps: deleteModalProps = {
    itemName: 'Test Wedding',
    onCloseModal: vi.fn(),
    onDelete: vi.fn().mockResolvedValue(undefined),
    isOpen: true,
    id: 123,
    ctaText: 'Delete',
    isLoading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(<DeleteModal {...defaultProps} />);

    expect(screen.getByText(/Confirm the deletion/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Wedding/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('calls onCloseModal when clicking Cancel', () => {
    render(<DeleteModal {...defaultProps} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(defaultProps.onCloseModal).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete with correct id and closes modal on confirm', async () => {
    render(<DeleteModal {...defaultProps} />);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(defaultProps.onDelete).toHaveBeenCalledWith(123);
    expect(defaultProps.onCloseModal).toHaveBeenCalled();
  });

  it('disables buttons and shows spinner when loading', () => {
    render(<DeleteModal {...defaultProps} isLoading={true} />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    const deleteButton = screen.getByTestId('delete-button');

    expect(deleteButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(deleteButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });
});
