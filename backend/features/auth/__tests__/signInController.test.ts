import { describe, expect, it, Mock, vi } from 'vitest'
import { mockUser } from '../../__mocks__/mockUser'
import { signInService } from '../auth.service'
import { signInController } from '../auth.controller'
import { AppError } from '../../../classes/app-error'

vi.mock('../auth.service')
const mockSignInService = signInService as Mock<
  typeof signInService
>
const req = {
  body: {
    email: mockUser.email,
    password: mockUser.password
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

const res = {
  status: vi.fn().mockReturnThis(),
  json: vi.fn()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

describe('signInController', () => {
  it('should call the controller successfully', async () => {
    mockSignInService.mockResolvedValue({
      username: mockUser.firstName,
      token: 'string'
    })

    await signInController(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      username: mockUser.firstName,
      token: 'string'
    })
  })

  it('should simulate an error when calling the controller', async () => {
    mockSignInService.mockRejectedValue(
      new AppError('Error', 401)
    )

    await signInController(req, res)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error'
    })
  })
})
