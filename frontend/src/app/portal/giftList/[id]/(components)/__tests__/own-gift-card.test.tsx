import { describe, expect, it, Mock, vi } from 'vitest'
import { giftListMocks } from '../../__mocks__/gift-list-mocks'
import OwnGiftCard, { OwnGiftCardProps } from '../giftCard/own-gift-card'
import { fireEvent, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import useSubmitUpdate from '../../(hooks)/useSubmitUpdate'

vi.mock('../../(hooks)/useSubmitUpdate')

const mockUseSubmitUpdate = useSubmitUpdate as Mock

describe('OwnGiftCard', () => {
  const giftCardProps: OwnGiftCardProps = {
    id: giftListMocks.weddingGifts[0].Id,
    productLink: giftListMocks.weddingGifts[0].productLink,
    productName: giftListMocks.weddingGifts[0].productName,
    quantity: giftListMocks.weddingGifts[0].quantity,
    setModalObject: vi.fn(),
  }

  it('should render the initial state correctly', () => {
    render(<OwnGiftCard {...giftCardProps} />)

    expect(screen.getByText(`${giftCardProps.productName}`)).toBeInTheDocument()
    expect(
      screen.queryByText(`Update this gift's Infos:`),
    ).not.toBeInTheDocument()
    const ctaLinkText = screen.getByRole('link', {
      name: /open this product's page on store/i,
    })
    expect(ctaLinkText).toHaveAttribute('href', `${giftCardProps.productLink}`)
  })

  it(`should update gift's props`, async () => {
    const mockSubmitUpdate = vi.fn()
    mockUseSubmitUpdate.mockReturnValue(mockSubmitUpdate)
    render(<OwnGiftCard {...giftCardProps} />)

    expect(screen.getByText(`${giftCardProps.productName}`)).toBeInTheDocument()
    expect(
      screen.queryByText(`Update this gift's Infos:`),
    ).not.toBeInTheDocument()
    const ctaLinkText = screen.getByRole('link', {
      name: /open this product's page on store/i,
    })
    expect(ctaLinkText).toHaveAttribute('href', `${giftCardProps.productLink}`)
    const updateGiftButton = screen.getByLabelText(/update-gift-button/i)
    expect(updateGiftButton).toBeInTheDocument()
    await userEvent.click(updateGiftButton)
    expect(screen.getByText(`Update this gift's Infos:`)).toBeInTheDocument()
    const productNameInput = screen.getByLabelText(/productName-input/i)
    const productLinkInput = screen.getByLabelText(/productLink-input/i)
    const quantityInput = screen.getByLabelText(/quantity-input/i)
    expect(productNameInput).toHaveValue(giftCardProps.productName)
    expect(productLinkInput).toHaveValue(giftCardProps.productLink)
    expect(quantityInput).toHaveValue(giftCardProps.quantity)
    fireEvent.change(quantityInput, { target: { value: 3 } })
    const submitUpdatebutton = screen.getByRole('button', {
      name: /update/i,
    })
    expect(submitUpdatebutton).toBeInTheDocument()
    await userEvent.click(submitUpdatebutton)
    expect(mockSubmitUpdate).toHaveBeenCalledWith(
      {
        quantity: 3,
        productLink: giftCardProps.productLink,
        productName: giftCardProps.productName,
      },
      giftCardProps.id,
    )
  })

  it('should simulate the click on update present and cancel afterwards', async () => {
    render(<OwnGiftCard {...giftCardProps} />)

    expect(screen.getByText(`${giftCardProps.productName}`)).toBeInTheDocument()
    expect(
      screen.queryByText(`Update this gift's Infos:`),
    ).not.toBeInTheDocument()
    const ctaLinkText = screen.getByRole('link', {
      name: /open this product's page on store/i,
    })
    expect(ctaLinkText).toHaveAttribute('href', `${giftCardProps.productLink}`)
    const updateGiftButton = screen.getByLabelText(/update-gift-button/i)
    expect(updateGiftButton).toBeInTheDocument()
    await userEvent.click(updateGiftButton)
    expect(screen.getByText(`Update this gift's Infos:`)).toBeInTheDocument()
    const productNameInput = screen.getByLabelText(/productName-input/i)
    const productLinkInput = screen.getByLabelText(/productLink-input/i)
    const quantityInput = screen.getByLabelText(/quantity-input/i)
    expect(productNameInput).toHaveValue(giftCardProps.productName)
    expect(productLinkInput).toHaveValue(giftCardProps.productLink)
    expect(quantityInput).toHaveValue(giftCardProps.quantity)
    const cancelUpdateButton = screen.getByRole('button', {
      name: /cancel/i,
    })
    expect(cancelUpdateButton).toBeInTheDocument()
    await userEvent.click(cancelUpdateButton)
    expect(
      screen.queryByText(`Update this gift's Infos:`),
    ).not.toBeInTheDocument()
  })
})
