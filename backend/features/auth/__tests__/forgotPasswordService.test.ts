import { describe, expect, it, Mock, vi } from 'vitest'
import { prisma } from '../../../lib/prisma'
import { mockUser } from '../../__mocks__/mockUser'
import { forgotPasswordService } from '../auth.service'
import { AppError } from '../../../classes/app-error'
import { transporter } from '../../../transporter/nodemailer-transporter'

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: {
      findUnique: vi.fn()
    },
    passwordResetTokenStorage: {
      create: vi.fn()
    }
  }
}))

vi.mock('../../../transporter/nodemailer-transporter')

const mockFindUnique = prisma.users.findUnique as Mock

const mockPasswordResetTokenStorage = prisma
  .passwordResetTokenStorage.create as Mock

const mockSendMail = transporter.sendMail as Mock

describe('forgotPasswordService', () => {
  it('should send the e-mail to recover password correctly', async () => {
    mockFindUnique.mockResolvedValue(mockUser)

    const result = await forgotPasswordService(
      mockUser.email
    )

    expect(mockPasswordResetTokenStorage).toHaveBeenCalled()
    expect(mockSendMail).toHaveBeenCalled()
    expect(result.message).toBe(
      'Recovery e-mail successfully sent.'
    )
  })

  it('should throw AppError with 404 if the logIn user does not exist', async () => {
    mockFindUnique.mockResolvedValue(null)

    await expect(
      forgotPasswordService(mockUser.email)
    ).rejects.toThrowError(AppError)
    await expect(
      forgotPasswordService(mockUser.email)
    ).rejects.toMatchObject({
      message:
        "There's no active user with this e-mail address.",
      status: 404
    })
  })
})
