import { describe, expect, it, Mock, vi } from 'vitest'
import { prisma } from '../../../lib/prisma'
import { mockUser } from '../../__mocks__/mockUser'
import { resetPasswordService } from '../auth.service'

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: {
      update: vi.fn()
    },
    passwordResetTokenStorage: {
      update: vi.fn()
    }
  }
}))

const mockUsersUpdate = prisma.users.update as Mock
const mockPasswordResetTokenStorageUpdate = prisma
  .passwordResetTokenStorage.update as Mock

describe('resetPasswordService', () => {
  it('should reset the password correctly', async () => {
    mockUsersUpdate.mockResolvedValue({})
    mockPasswordResetTokenStorageUpdate.mockResolvedValue(
      {}
    )

    const result = await resetPasswordService(
      mockUser.id,
      'reset-token',
      mockUser.password
    )

    expect(
      mockPasswordResetTokenStorageUpdate
    ).toHaveBeenCalled()
    expect(mockUsersUpdate).toHaveBeenCalled()
    expect(result.message).toBe(
      'Password reset successfully.'
    )
  })

  it('should throw AppError with 400 if the userID is an empty string', async () => {
    await expect(
      resetPasswordService(
        '',
        'reset-token',
        mockUser.password
      )
    ).rejects.toMatchObject({
      message: 'Missing User ID',
      status: 400
    })
  })

  it('should throw AppError with 401 if the reset token is null', async () => {
    await expect(
      resetPasswordService(
        mockUser.id,
        '',
        mockUser.password
      )
    ).rejects.toMatchObject({
      message: 'Reset Token not present.',
      status: 401
    })
  })
})
