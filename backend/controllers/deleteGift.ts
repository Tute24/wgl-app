import express, { Router, Response } from 'express'
import isAuthenticated, { CustomRequest } from '../middleware/authMiddleware'
import { prisma } from '../app'
const deleteGiftRouter: Router = express.Router()

deleteGiftRouter.post(
  '/deleteGift',
  isAuthenticated,
  async (req: CustomRequest, res: Response) => {
    const userID = req.authUser?.id
    const { giftID } = req.body

    const user = await prisma.users.findUnique({
      where: {
        id: userID,
      },
    })

    const gift = await prisma.gifts.findUnique({
      where: {
        id: giftID,
      },
    })

    if (!user || !gift) {
      res.status(404).json({ message: 'User/Gift not found.' })
      return
    }

    if (userID) {
      try {
        const wedding = await prisma.weddings.findUnique({
          where: {
            id: gift.fromWedding,
          },
        })

        if (wedding?.createdBy === userID) {
          const deletedGift = await prisma.gifts.delete({
            where: {
              id: giftID,
            },
          })

          if (deletedGift) {
            res.status(200).json({ message: 'Gift deleted successfully.' })
            return
          }
        }

        res
          .status(403)
          .json({ message: 'This user is not the wedding creator.' })
        return
      } catch (error) {
        res.status(500).json({ message: 'Server error.' })
        return
      }
    }
  }
)

export default deleteGiftRouter
