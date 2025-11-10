import { describe, it, expect, vi, Mock } from 'vitest'
import axios from 'axios'
import AxiosErrorHandler from '../axios-error-handler'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

vi.mock('axios')
vi.mock('next/navigation')

const mockAxiosError = axios.isAxiosError as unknown as Mock
const mockRouter = {
  push: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
} as unknown as AppRouterInstance

describe('AxiosErrorHandler', () => {
  it('handles 401 error: sets status message and redirects to /401-page', () => {
    const mockSetStatusMessage = vi.fn()

    mockAxiosError.mockReturnValue(true)
    const error = { response: { status: 401 } }

    AxiosErrorHandler({
      error,
      setStatusMessage: mockSetStatusMessage,
      route: mockRouter,
    })

    expect(mockSetStatusMessage).toHaveBeenCalledWith('Not signed in.')
    expect(mockRouter.push).toHaveBeenCalledWith('/401-page')
  })

  it('handles 403 error: redirects to /portal/403-page', () => {
    mockAxiosError.mockReturnValue(true)
    const error = { response: { status: 403 } }

    AxiosErrorHandler({
      error,
      route: mockRouter,
    })

    expect(mockRouter.push).toHaveBeenCalledWith('/portal/403-page')
  })

  it('handles 404 error: redirects to /portal/404-page', () => {
    mockAxiosError.mockReturnValue(true)
    const error = { response: { status: 404 } }

    AxiosErrorHandler({
      error,
      route: mockRouter,
    })

    expect(mockRouter.push).toHaveBeenCalledWith('/portal/404-page')
  })

  it('handles 409 error: sets specific conflict message', () => {
    const mockSetStatusMessage = vi.fn()

    mockAxiosError.mockReturnValue(true)
    const error = { response: { status: 409 } }

    AxiosErrorHandler({
      error,
      setStatusMessage: mockSetStatusMessage,
    })

    expect(mockSetStatusMessage).toHaveBeenCalledWith(
      'You submitted a gift with a name that already exists.',
    )
  })

  it('handles 500 error: sets general error message', () => {
    const mockSetStatusMessage = vi.fn()

    mockAxiosError.mockReturnValue(true)
    const error = { response: { status: 500 } }

    AxiosErrorHandler({
      error,
      setStatusMessage: mockSetStatusMessage,
    })

    expect(mockSetStatusMessage).toHaveBeenCalledWith(
      'Something went wrong. Try again.',
    )
  })

  it('does nothing if not an AxiosError', () => {
    mockAxiosError.mockReturnValue(false)
    const mockSetStatusMessage = vi.fn()

    AxiosErrorHandler({
      error: new Error('Generic error'),
      setStatusMessage: mockSetStatusMessage,
      route: mockRouter,
    })

    expect(mockRouter.push).not.toHaveBeenCalled()
    expect(mockSetStatusMessage).not.toHaveBeenCalled()
  })
})
