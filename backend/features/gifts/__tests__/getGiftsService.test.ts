import { describe, it, expect, vi, Mock } from 'vitest'
import { prisma } from '../../../lib/prisma'
import { getGiftsService } from '../gifts.service'
import { mockUser } from '../../__mocks__/mockUser'
import { mockWedding } from '../../__mocks__/mockWedding'
import { mockGift } from '../../__mocks__/mockGift'

vi.mock('../../../lib/prisma', () => ({
  prisma: {
    users: { findUnique: vi.fn() },
    weddings: { findUnique: vi.fn() },
    gifts: { findMany: vi.fn() }
  }
}))

const mockUsersFindUnique = prisma.users.findUnique as Mock
const mockWeddingsFindUnique = prisma.weddings.findUnique as Mock

describe('getGiftsService', () => {
  const userID = mockUser.id
  const weddingID = mockWedding.id

  it('should return owner success response', async () => {
    mockUsersFindUnique.mockResolvedValueOnce(mockUser)
    mockWeddingsFindUnique.mockResolvedValueOnce(mockWedding)
    mockUsersFindUnique.mockResolvedValueOnce({
      ...mockUser,
      weddingsOwn: [{ id: weddingID }],
      weddingsGuest: []
    })
    mockWeddingsFindUnique.mockResolvedValueOnce({
      ...mockWedding,
      gifts: [mockGift]
    })

    const response = await getGiftsService(userID, weddingID)

    expect(response.message).toBe('Success (owner)!')
    expect(response.responseObject.checkPreferences.isCreator).toBe(true)
    expect(response.responseObject.weddingGifts!.length).toBe(1)
  })

  it('should return guest success response', async () => {
    mockUsersFindUnique.mockResolvedValueOnce(mockUser)
    mockWeddingsFindUnique.mockResolvedValueOnce(mockWedding)
    mockUsersFindUnique.mockResolvedValueOnce({
      ...mockUser,
      weddingsOwn: [],
      weddingsGuest: [{ referencedWedding: weddingID }]
    })
    mockWeddingsFindUnique.mockResolvedValueOnce({
      ...mockWedding,
      gifts: [mockGift]
    })

    const response = await getGiftsService(userID, weddingID)

    expect(response.message).toBe('Success (guest)!')
    expect(response.responseObject.checkPreferences.isGuest).toBe(true)
    expect(response.responseObject.weddingGifts!.length).toBe(1)
  })

  it('should return empty list when user is neither creator nor guest', async () => {
    mockUsersFindUnique.mockResolvedValueOnce(mockUser)
    mockWeddingsFindUnique.mockResolvedValueOnce(mockWedding)
    mockUsersFindUnique.mockResolvedValueOnce({
      ...mockUser,
      weddingsOwn: [],
      weddingsGuest: []
    })

    const response = await getGiftsService(userID, weddingID)

    expect(response.message).toBe('Not a creator neither a guest.')
    expect(response.responseObject.weddingGifts).toEqual([])
  })

  it('should throw 404 if user is not found', async () => {
    mockUsersFindUnique.mockResolvedValue(null)

    await expect(getGiftsService(userID, weddingID)).rejects.toMatchObject({
      message: "Couldn't find the user on the database.",
      status: 404
    })
  })

  it('should throw 404 if wedding is not found', async () => {
    mockUsersFindUnique.mockResolvedValue(mockUser)
    mockWeddingsFindUnique.mockResolvedValue(null)

    await expect(getGiftsService(userID, weddingID)).rejects.toMatchObject({
      message: "Couldn't find the wedding on the database.",
      status: 404
    })
  })
})
