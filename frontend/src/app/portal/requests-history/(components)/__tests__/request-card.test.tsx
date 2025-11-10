import { describe, expect, it, Mock, vi } from 'vitest'
import { useAcceptRequest } from '../../(hooks)/useAcceptRequest'
import { useDenyRequest } from '../../(hooks)/useDenyRequest'
import RequestCard, { RequestCardProps } from '../request-card'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('../../(hooks)/useAcceptRequest')
vi.mock('../../(hooks)/useDenyRequest')

const mockUseAcceptRequest = useAcceptRequest as Mock
const mockUseDenyRequest = useDenyRequest as Mock

describe('RequestCard', () => {
  it('should render the card correctly when pending is true, and call the proper hook when the request is accepted', async () => {
    const mockRequestCardProps: RequestCardProps = {
      requestByName: 'Name1',
      requestId: 1,
      madeOn: '01-01-2025',
      weddingTitle: 'Wedding1',
      pending: true,
      accepted: false,
      isLoading: false,
    }
    const mockAcceptRequest = vi.fn()
    mockUseAcceptRequest.mockReturnValue(mockAcceptRequest)

    render(<RequestCard {...mockRequestCardProps} />)

    expect(
      screen.getByText(new RegExp(`${mockRequestCardProps.weddingTitle}`, 'i')),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        new RegExp(`${mockRequestCardProps.requestByName}`, 'i'),
      ),
    ).toBeInTheDocument()

    const acceptButton = screen.getByText('Accept Request')
    expect(acceptButton).toBeInTheDocument()
    await userEvent.click(acceptButton)
    expect(mockAcceptRequest).toHaveBeenCalledWith(
      mockRequestCardProps.requestId,
    )
  })

  it('should render the card correctly when pending is true, and call the proper hook when the request is denied', async () => {
    const mockRequestCardProps: RequestCardProps = {
      requestByName: 'Name1',
      requestId: 1,
      madeOn: '01-01-2025',
      weddingTitle: 'Wedding1',
      pending: true,
      accepted: false,
      isLoading: false,
    }
    const mockDenyRequest = vi.fn()
    mockUseDenyRequest.mockReturnValue(mockDenyRequest)

    render(<RequestCard {...mockRequestCardProps} />)

    expect(
      screen.getByText(new RegExp(`${mockRequestCardProps.weddingTitle}`, 'i')),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        new RegExp(`${mockRequestCardProps.requestByName}`, 'i'),
      ),
    ).toBeInTheDocument()

    const acceptButton = screen.getByText('Deny Request')
    expect(acceptButton).toBeInTheDocument()
    await userEvent.click(acceptButton)
    expect(mockDenyRequest).toHaveBeenCalledWith(mockRequestCardProps.requestId)
  })

  it('should render the card correctly when pending is false, and accepted is false', async () => {
    const mockRequestCardProps: RequestCardProps = {
      requestByName: 'Name1',
      requestId: 1,
      madeOn: '01-01-2025',
      weddingTitle: 'Wedding1',
      pending: false,
      accepted: false,
      isLoading: false,
    }

    render(<RequestCard {...mockRequestCardProps} />)

    expect(
      screen.getByText(new RegExp(`${mockRequestCardProps.weddingTitle}`, 'i')),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        new RegExp(`${mockRequestCardProps.requestByName}`, 'i'),
      ),
    ).toBeInTheDocument()
    expect(screen.getByText(/Denied/i)).toBeInTheDocument()
  })

  it('should render the card correctly when pending is false, and accepted is true', async () => {
    const mockRequestCardProps: RequestCardProps = {
      requestByName: 'Name1',
      requestId: 1,
      madeOn: '01-01-2025',
      weddingTitle: 'Wedding1',
      pending: false,
      accepted: true,
      isLoading: false,
    }

    render(<RequestCard {...mockRequestCardProps} />)

    expect(
      screen.getByText(new RegExp(`${mockRequestCardProps.weddingTitle}`, 'i')),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        new RegExp(`${mockRequestCardProps.requestByName}`, 'i'),
      ),
    ).toBeInTheDocument()
    expect(screen.getByText(/Accepted/i)).toBeInTheDocument()
  })
})
