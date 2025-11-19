import { describe, expect, it, Mock, vi } from 'vitest'
import { prisma } from '../../../lib/prisma'
import { mockUser } from '../../__mocks__/mockUser'
import { mockGift } from '../../__mocks__/mockGift'
import { mockWedding } from '../../__mocks__/mockWedding'
import { updateGiftService } from '../gifts.service'

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: {
      findUnique: vi.fn()
    },
    gifts: {
      findUnique: vi.fn(),
      update: vi.fn()
    },
    weddings: {
      findUnique: vi.fn()
    }
  }
}))

const mockUsersFindUnique = prisma.users.findUnique as Mock
const mockGiftsFindUnique = prisma.gifts.findUnique as Mock
const mockGiftsUpdate = prisma.gifts.findUnique as Mock
const mockWeddingsFindUnique = prisma.weddings
  .findUnique as Mock

describe('updateGiftService', () => {
  it('should call the service successfully', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser)
    mockGiftsFindUnique.mockResolvedValue(mockGift)
    mockWeddingsFindUnique.mockResolvedValue(mockWedding)

    const response = await updateGiftService(
      mockUser.id,
      mockGift.productName,
      mockGift.productLink,
      mockGift.quantity,
      mockGift.giftID
    )

    expect(response.message).toBe(
      'Gifted updated successfully.'
    )
    expect(mockGiftsUpdate).toHaveBeenCalled()
  })

  it('should throw 404 if user is not found', async () => {
    mockUsersFindUnique.mockResolvedValue(null)

    await expect(
      updateGiftService(
        mockUser.id,
        mockGift.productName,
        mockGift.productLink,
        mockGift.quantity,
        mockGift.giftID
      )
    ).rejects.toMatchObject({
      message: "Couldn't find the user on the database.",
      status: 404
    })
  })

  it('should throw 404 if gift is not found', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser)
    mockGiftsFindUnique.mockResolvedValue(null)

    await expect(
      updateGiftService(
        mockUser.id,
        mockGift.productName,
        mockGift.productLink,
        mockGift.quantity,
        mockGift.giftID
      )
    ).rejects.toMatchObject({
      message: "Couldn't find this gift on the database.",
      status: 404
    })
  })

  it('should throw 403 if the user is not the wedding creator', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser)
    mockGiftsFindUnique.mockResolvedValue(mockGift)
    mockWeddingsFindUnique.mockResolvedValue(mockWedding)

    await expect(
      updateGiftService(
        'userID',
        mockGift.productName,
        mockGift.productLink,
        mockGift.quantity,
        mockGift.giftID
      )
    ).rejects.toMatchObject({
      message: 'This user is not the wedding creator',
      status: 403
    })
  })
})
