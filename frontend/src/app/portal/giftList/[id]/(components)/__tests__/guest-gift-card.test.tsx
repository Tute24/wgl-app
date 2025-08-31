import { describe, expect, it, Mock, vi } from 'vitest'
import { giftListMocks } from '../../__mocks__/gift-list-mocks'
import { GiftCardProps } from '../giftCard/own-gift-card'
import { fireEvent, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import GuestGiftCard from '../giftCard/guest-gift-card'
import useGiftPresent from '../../(hooks)/useGiftPresent'

vi.mock('../../(hooks)/useGiftPresent')

const mockUseGiftPresent = useGiftPresent as Mock

describe('GuestGiftCard', () => {
  const giftCardProps: GiftCardProps = {
    id: giftListMocks.weddingGifts[0].Id,
    productLink: giftListMocks.weddingGifts[0].productLink,
    productName: giftListMocks.weddingGifts[0].productName,
    quantity: giftListMocks.weddingGifts[0].quantity,
    setModalObject: vi.fn(),
  }

  it('should render the initial state correctly', () => {
    render(<GuestGiftCard {...giftCardProps} />)

    expect(screen.getByText(`${giftCardProps.productName}`)).toBeInTheDocument()
    expect(screen.getByText('Gift Present')).toBeInTheDocument()
    expect(
      screen.queryByText('Type the quantity you want to gift:'),
    ).not.toBeInTheDocument()
    const ctaLinkText = screen.getByRole('link', {
      name: /open this product's page on store/i,
    })
    expect(ctaLinkText).toHaveAttribute('href', `${giftCardProps.productLink}`)
  })

  it('should gift a present', async () => {
    const mockGiftPresent = vi.fn()
    mockUseGiftPresent.mockReturnValue(mockGiftPresent)
    render(<GuestGiftCard {...giftCardProps} />)

    expect(screen.getByText(`${giftCardProps.productName}`)).toBeInTheDocument()
    expect(
      screen.queryByText('Type the quantity you want to gift:'),
    ).not.toBeInTheDocument()
    const giftPresentButton = screen.getByRole('button', {
      name: /gift present/i,
    })
    expect(giftPresentButton).toBeInTheDocument()
    fireEvent.click(giftPresentButton)
    expect(
      screen.getByText('Type the quantity you want to gift:'),
    ).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    const quantityInput = screen.getByRole('spinbutton')
    expect(quantityInput).toBeInTheDocument()
    fireEvent.change(quantityInput, { target: { value: 1 } })
    const confirmGiftingButton = screen.getByRole('button', {
      name: /confirm/i,
    })
    expect(quantityInput).toHaveValue(1)
    expect(confirmGiftingButton).toBeInTheDocument()
    await userEvent.click(confirmGiftingButton)
    expect(mockGiftPresent).toHaveBeenCalledWith(giftCardProps.id, 1)
  })

  it('should simulate the click on gift present and cancel afterwards', () => {
    render(<GuestGiftCard {...giftCardProps} />)

    expect(screen.getByText(`${giftCardProps.productName}`)).toBeInTheDocument()
    expect(
      screen.queryByText('Type the quantity you want to gift:'),
    ).not.toBeInTheDocument()
    const giftPresentButton = screen.getByRole('button', {
      name: /gift present/i,
    })
    expect(giftPresentButton).toBeInTheDocument()
    fireEvent.click(giftPresentButton)
    expect(
      screen.getByText('Type the quantity you want to gift:'),
    ).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
    const cancelGiftingButton = screen.getByRole('button', {
      name: /cancel/i,
    })
    fireEvent.click(cancelGiftingButton)
    expect(
      screen.queryByText('Type the quantity you want to gift:'),
    ).not.toBeInTheDocument()
  })
})
