import { describe, expect, it, Mock, vi } from 'vitest'
import { prisma } from '../../../lib/prisma'
import { deleteGiftService } from '../gifts.service'
import { mockUser } from '../../__mocks__/mockUser'
import { mockGift } from '../../__mocks__/mockGift'
import { mockWedding } from '../../__mocks__/mockWedding'

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: {
      findUnique: vi.fn()
    },
    gifts: {
      findUnique: vi.fn(),
      delete: vi.fn()
    },
    weddings: {
      findUnique: vi.fn()
    }
  }
}))

const mockUsersFindUnique = prisma.users.findUnique as Mock
const mockGiftsFindUnique = prisma.gifts.findUnique as Mock
const mockWeddingsFindUnique = prisma.weddings.findUnique as Mock
const mockGiftsDelete = prisma.gifts.delete as Mock

describe('deleteGiftService', () => {
  it('should delete the gift successfully', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser)
    mockGiftsFindUnique.mockResolvedValue(mockGift)
    mockWeddingsFindUnique.mockResolvedValue(mockWedding)
    mockGiftsDelete.mockResolvedValue({})

    const response = await deleteGiftService(
      mockUser.id,
      mockGift.giftID
    )

    expect(response.message).toBe('Gift deleted successfully.')
    expect(mockUsersFindUnique).toHaveBeenCalled()
    expect(mockGiftsFindUnique).toHaveBeenCalled()
    expect(mockWeddingsFindUnique).toHaveBeenCalled()
    expect(mockGiftsDelete).toHaveBeenCalled()
  })

  it('should throw 404 if user is not found', async () => {
    mockUsersFindUnique.mockResolvedValue(null)

    await expect(
      deleteGiftService(mockUser.id, mockGift.giftID)
    ).rejects.toMatchObject({
      message: "Couldn't find the user on the database.",
      status: 404
    })
  })

  it('should throw 404 if gift is not found', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser)
    mockGiftsFindUnique.mockResolvedValue(null)

    await expect(
      deleteGiftService(mockUser.id, mockGift.giftID)
    ).rejects.toMatchObject({
      message: "Couldn't find the gift on the database.",
      status: 404
    })
  })

  it('should throw 403 if user is not the wedding creator', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser)
    mockGiftsFindUnique.mockResolvedValue(mockGift)

    mockWeddingsFindUnique.mockResolvedValue({
      ...mockWedding,
      createdBy: 'different-user-id'
    })

    await expect(
      deleteGiftService(mockUser.id, mockGift.giftID)
    ).rejects.toMatchObject({
      message: 'This user is not the wedding creator.',
      status: 403
    })
  })
})
