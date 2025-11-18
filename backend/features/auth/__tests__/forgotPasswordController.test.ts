import { describe, expect, it, Mock, vi } from 'vitest'
import { mockUser } from '../../__mocks__/mockUser'
import { forgotPasswordService } from '../auth.service'
import { forgotPasswordController } from '../auth.controller'
import { AppError } from '../../../classes/app-error'

vi.mock('../auth.service')
const mockForgotPasswordService =
  forgotPasswordService as Mock<
    typeof forgotPasswordService
  >
const req = {
  body: {
    email: mockUser.email
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

const res = {
  status: vi.fn().mockReturnThis(),
  json: vi.fn()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

describe('forgotPasswordController', () => {
  it('should call the controller successfully', async () => {
    mockForgotPasswordService.mockResolvedValue({
      message: 'message'
    })

    await forgotPasswordController(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'message'
    })
  })

  it('should simulate an error when calling the controller', async () => {
    mockForgotPasswordService.mockRejectedValue(
      new AppError(
        "There's no active user with this e-mail address.",
        404
      )
    )

    await forgotPasswordController(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message:
        "There's no active user with this e-mail address."
    })
  })
})
