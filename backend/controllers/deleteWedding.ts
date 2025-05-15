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
    console.log(userID)

    const user = await prisma.users.findUnique({
      where: {
        id: userID
      }
    })

    const checkWedding = await prisma.weddings.findUnique({
      where: {
        id
      }
    })

    if (!user || !checkWedding) {
      res.status(404).json({ message: 'User not found.' })
      return
    }

    if (userID !== checkWedding.createdBy) {
      res
        .status(403)
        .json({ message: 'The user is not the wedding\'s creator.' })
      return
    }

    console.log('aight', user, checkWedding)

    if (userID) {
      try {
        await prisma.guests.deleteMany({
          where: {
            referencedWedding: id
          }
        })

        await prisma.gifts.deleteMany({
          where: {
            fromWedding: id
          }
        })

        await prisma.requests.deleteMany({
          where: {
            relatedWedding: id,
            pending: true
          }
        })

        await prisma.giftedBy.deleteMany({
          where: {
            relatedWedding: id
          }
        })

        await prisma.weddings.delete({
          where: {
            id
          }
        })

        res.status(200).json({ message: 'Wedding deleted successfully.' })
      } catch (error) {
        res.status(500).json({ message: 'Server Error.' })
      }
    }
  }
)

export default deleteWeddingRouter
