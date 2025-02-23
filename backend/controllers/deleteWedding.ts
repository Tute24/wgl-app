import express, { Router, Response } from 'express'
import isAuthenticated, { CustomRequest } from '../middleware/authMiddleware'
import { prisma } from '../app'
const deleteWeddingRouter: Router = express.Router()

deleteWeddingRouter.post(
  '/deleteWedding',
  isAuthenticated,
  async (req: CustomRequest, res: Response) => {
    const userID = req.authUser?.id
    const { id } = req.body

    const user = await prisma.users.findUnique({
      where: {
        id: userID,
      },
    })

    const checkWedding = await prisma.weddings.findUnique({
      where: {
        id: id,
      },
    })

    if (!user || !checkWedding) {
      res.status(404).json({ message: 'User not found.' })
      return
    }

    if (userID) {
      try {
        const deleteWedding = await prisma.weddings.delete({
          where: {
            id: id,
          },
        })

        const deleteWeddingGuests = await prisma.guests.deleteMany({
          where: {
            referencedWedding: id,
          },
        })

        const deleteWeddingGifts = await prisma.gifts.deleteMany({
          where: {
            fromWedding: id,
          },
        })

        const deletePendingWeddingRequests = await prisma.requests.deleteMany({
          where: {
            relatedWedding: id,
            pending: true,
          },
        })

        res.status(200).json({ message: 'Wedding deleted successfully.' })
      } catch (error) {
        res.status(500).json({ message: 'Server Error.' })
      }
    }
  }
)

export default deleteWeddingRouter
