import { describe, expect, it, Mock, vi } from 'vitest'
import { mockUser } from '../../__mocks__/mockUser'
import { resetPasswordService } from '../auth.service'
import { resetPasswordController } from '../auth.controller'

vi.mock('../auth.service')
const mockResetPasswordService =
  resetPasswordService as Mock<typeof resetPasswordService>

const res = {
  status: vi.fn().mockReturnThis(),
  json: vi.fn()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

describe('resetPasswordController', () => {
  it('should call the controller successfully', async () => {
    const req = {
      body: {
        email: mockUser.email
      },
      authData: {
        id: mockUser.id,
        resetToken: 'reset-token'
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any

    mockResetPasswordService.mockResolvedValue({
      message: 'message'
    })

    await resetPasswordController(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'message'
    })
  })

  it('should simulate an error when calling the controller if id is an empty string', async () => {
    const req = {
      body: {
        email: mockUser.email
      },
      authData: {
        id: '',
        resetToken: 'reset-token'
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any

    await resetPasswordController(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message:
         'Missing reset password credentials'
    })
  })
})
