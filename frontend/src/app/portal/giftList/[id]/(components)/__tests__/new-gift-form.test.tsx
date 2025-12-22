import { describe, expect, it, Mock, vi } from 'vitest';
import useSubmitNewGift from '../../(hooks)/useSubmitNewGifts';
import { fireEvent, render, screen } from '@testing-library/react';
import NewGiftForm from '../new-gift-form/new-gift-form';
import userEvent from '@testing-library/user-event';
import { giftListMocks } from '../../__mocks__/gift-list-mocks';
import { useGeneralStore } from '@/stores/general/general.provider';

vi.mock('@/stores/general/general.provider');
vi.mock('../../(hooks)/useSubmitNewGifts');

const mockUseSubmitNewGift = useSubmitNewGift as Mock;
const mockUseGeneralStore = useGeneralStore as Mock;

describe('NewGiftForm', () => {
  it('should render the initial state correctly and simulate adding a gift', async () => {
    const statusMessage = '';
    mockUseGeneralStore.mockReturnValue(statusMessage);
    const mockSubmitNewGift = vi.fn();
    mockUseSubmitNewGift.mockReturnValue(mockSubmitNewGift);

    render(<NewGiftForm />);

    const addGiftsButton = screen.getByRole('button', {
      name: /add gifts/i,
    });
    expect(addGiftsButton).toBeInTheDocument();
    expect(screen.queryByText(`Increment your list of gifts`)).not.toBeInTheDocument();
    await userEvent.click(addGiftsButton);
    expect(screen.getByText('Increment your list of gifts')).toBeInTheDocument();
    const productNameInput = screen.getByPlaceholderText(`Enter the product's name`);
    const productLinkInput = screen.getByPlaceholderText(`Link to buy the gift`);
    const quantityInput = screen.getByRole('spinbutton');
    expect(productNameInput).toBeInTheDocument();
    expect(productLinkInput).toBeInTheDocument();
    expect(quantityInput).toBeInTheDocument();
    fireEvent.change(productNameInput, {
      target: { value: giftListMocks.weddingGifts[0].productName },
    });
    fireEvent.change(productLinkInput, {
      target: { value: giftListMocks.weddingGifts[0].productLink },
    });
    fireEvent.change(quantityInput, {
      target: { value: giftListMocks.weddingGifts[0].quantity },
    });
    const submitNewGiftButton = screen.getByRole('button', {
      name: /submit/i,
    });
    expect(submitNewGiftButton).toBeInTheDocument();
    await userEvent.click(submitNewGiftButton);
    expect(mockSubmitNewGift).toHaveBeenCalledWith({
      gifts: [
        {
          productName: giftListMocks.weddingGifts[0].productName,
          productLink: giftListMocks.weddingGifts[0].productLink,
          quantity: giftListMocks.weddingGifts[0].quantity.toString(),
        },
      ],
    });
  });

  it('should go back to the initial state after clicking on the X button', async () => {
    const statusMessage = '';
    mockUseGeneralStore.mockReturnValue(statusMessage);
    const mockSubmitNewGift = vi.fn();
    mockUseSubmitNewGift.mockReturnValue(mockSubmitNewGift);

    render(<NewGiftForm />);

    const addGiftsButton = screen.getByRole('button', {
      name: /add gifts/i,
    });
    expect(addGiftsButton).toBeInTheDocument();
    expect(screen.queryByText(`Increment your list of gifts`)).not.toBeInTheDocument();
    await userEvent.click(addGiftsButton);
    expect(screen.getByText('Increment your list of gifts')).toBeInTheDocument();
    const removeSetButton = screen.getByLabelText('remove-set');
    expect(removeSetButton).toBeInTheDocument();
    await userEvent.click(removeSetButton);
    expect(screen.queryByText(`Increment your list of gifts`)).not.toBeInTheDocument();
  });
});
