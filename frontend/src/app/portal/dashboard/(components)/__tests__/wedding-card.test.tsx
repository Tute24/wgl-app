import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import WeddingCard from '../weddingCard/wedding-card'
import { weddingsMock } from '../../__mocks__/weddingsMock'

describe('WeddingCard', () => {
  const mockSetModalObject = vi.fn()
  function renderComponent(isOwn: boolean) {
    return render(
      <WeddingCard
        id={isOwn ? weddingsMock.ownWeddings.id : weddingsMock.guestWeddings.id}
        title={
          isOwn
            ? weddingsMock.ownWeddings.weddingTitle
            : weddingsMock.guestWeddings.weddingTitle
        }
        date={
          isOwn
            ? weddingsMock.ownWeddings.weddingDate
            : weddingsMock.guestWeddings.weddingDate
        }
        isOwn={isOwn}
        setModalObject={mockSetModalObject}
      />,
    )
  }
  it('should render owner card correctly', () => {
    renderComponent(true)

    expect(
      screen.getByText(weddingsMock.ownWeddings.weddingDate),
    ).toBeInTheDocument()
    expect(
      screen.getByText(weddingsMock.ownWeddings.weddingTitle),
    ).toBeInTheDocument()

    const ctaLinkText = screen.getByRole('link', {
      name: /go to this wedding's page/i,
    })
    fireEvent.click(ctaLinkText)
    expect(ctaLinkText).toHaveAttribute(
      'href',
      `/portal/giftList/${weddingsMock.ownWeddings.id}`,
    )
  })

  it('should render guest card correctly', () => {
    renderComponent(false)

    expect(
      screen.getByText(weddingsMock.guestWeddings.weddingDate),
    ).toBeInTheDocument()
    expect(
      screen.getByText(weddingsMock.guestWeddings.weddingTitle),
    ).toBeInTheDocument()

    const ctaLinkText = screen.getByRole('link', {
      name: /go to this wedding's page/i,
    })
    fireEvent.click(ctaLinkText)
    expect(ctaLinkText).toHaveAttribute(
      'href',
      `/portal/giftList/${weddingsMock.guestWeddings.id}`,
    )
  })

  it('should call setModalObject correctly and display the modal on owner card', () => {
    renderComponent(true)

    expect(
      screen.getByText(weddingsMock.ownWeddings.weddingDate),
    ).toBeInTheDocument()
    expect(
      screen.getByText(weddingsMock.ownWeddings.weddingTitle),
    ).toBeInTheDocument()

    const trashButton = screen.getByRole('button', { name: /delete/i })
    fireEvent.click(trashButton)
    expect(mockSetModalObject).toHaveBeenCalledWith({
      id: weddingsMock.ownWeddings.id,
      name: weddingsMock.ownWeddings.weddingTitle,
      isOpen: true,
    })
  })
})
