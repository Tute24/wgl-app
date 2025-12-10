import { describe, expect, it, Mock, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useGeneralStore } from '@/stores/general/general.provider';
import useSubmitList from '../../../(hooks)/useSubmitList';
import GiftListForm from '../new-wedding-form';
import { mockNewList } from '../../../__mocks__/weddingsMock';

vi.mock('@/stores/general/general.provider');
vi.mock('../../../(hooks)/useSubmitList');

const mockUseSubmitList = useSubmitList as Mock;
const mockUseGeneralStore = useGeneralStore as Mock;

describe('NewGiftForm', () => {
  it('should render the initial state correctly', async () => {
    const statusMessage = '';
    mockUseGeneralStore.mockReturnValue(statusMessage);

    render(<GiftListForm />);

    expect(screen.getByText(`Create a wedding gift list`)).toBeInTheDocument();
    expect(
      screen.getByText(`Enter the wedding's infos and set up it's gifts list`),
    ).toBeInTheDocument();

    const weddingTitleInput = screen.getByPlaceholderText(`Enter the wedding's name`);
    const weddingDateInput = screen.getByTestId('wedding-date-input');
    const shippingAddressInput = screen.getByPlaceholderText(`The gift's delivery address`);
    const addGiftButton = screen.getByText('Add gift');

    expect(weddingTitleInput).toBeInTheDocument();
    expect(shippingAddressInput).toBeInTheDocument();
    expect(weddingDateInput).toBeInTheDocument();
    expect(addGiftButton).toBeInTheDocument();
  });

  it('should create a new wedding', async () => {
    const statusMessage = '';
    mockUseGeneralStore.mockReturnValue(statusMessage);
    const mockSubmitList = vi.fn();
    mockUseSubmitList.mockReturnValue(mockSubmitList);

    render(<GiftListForm />);

    expect(screen.getByText(`Create a wedding gift list`)).toBeInTheDocument();
    expect(
      screen.getByText(`Enter the wedding's infos and set up it's gifts list`),
    ).toBeInTheDocument();

    const weddingTitleInput = screen.getByPlaceholderText(`Enter the wedding's name`);
    const weddingDateInput = screen.getByTestId('wedding-date-input');
    const shippingAddressInput = screen.getByPlaceholderText(`The gift's delivery address`);

    const addGiftButton = screen.getByText('Add gift');

    expect(weddingTitleInput).toBeInTheDocument();
    expect(shippingAddressInput).toBeInTheDocument();
    expect(weddingDateInput).toBeInTheDocument();
    expect(addGiftButton).toBeInTheDocument();

    await userEvent.click(addGiftButton);

    const productNameInput = await screen.findByPlaceholderText(`Enter the product's name`);
    const productLinkInput = await screen.findByPlaceholderText(`Link to buy the gift`);
    const quantityInput = await screen.findByRole('spinbutton');

    expect(productNameInput).toBeInTheDocument();
    expect(productLinkInput).toBeInTheDocument();
    expect(quantityInput).toBeInTheDocument();

    fireEvent.change(weddingTitleInput, {
      target: { value: mockNewList.listTitle },
    });
    fireEvent.change(shippingAddressInput, {
      target: { value: mockNewList.shippingAddress },
    });
    fireEvent.change(weddingDateInput, {
      target: { value: mockNewList.weddingDate },
    });
    fireEvent.change(productNameInput, {
      target: { value: mockNewList.gifts[0].productName },
    });
    fireEvent.change(productLinkInput, {
      target: { value: mockNewList.gifts[0].productLink },
    });
    fireEvent.change(quantityInput, {
      target: { value: mockNewList.gifts[0].quantity },
    });

    const createListButton = screen.getByRole('button', {
      name: /create list/i,
    });

    expect(createListButton).toBeInTheDocument();

    await userEvent.click(createListButton);

    expect(mockSubmitList).toHaveBeenCalledWith(mockNewList);
  });
});
