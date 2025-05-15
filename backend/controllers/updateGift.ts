import express, { Router, Response } from 'express'
import isAuthenticated, {
  CustomRequest
} from '../middleware/authMiddleware'
import { prisma } from '../app'
const updateGiftRouter: Router = express.Router()

updateGiftRouter.post(
  '/updateGift',
  isAuthenticated,
  async (req: CustomRequest, res: Response) => {
    const userID = req.authUser?.id
    const { giftID, productName, productLink, quantity } =
      req.body
    const quantityNum = Number(quantity)

    const gift = await prisma.gifts.findUnique({
      where: {
        id: giftID
      }
    })

    if (!gift) {
      res
        .status(404)
        .json({ message: 'User/Gift not found.' })
      return
    }

    if (userID) {
      try {
        const wedding = await prisma.weddings.findUnique({
          where: {
            id: gift.fromWedding
          }
        })

        if (wedding?.createdBy === userID) {
          const updatedGift = await prisma.gifts.update({
            where: {
              id: giftID
            },
            data: {
              productLink,
              productName,
              quantity: quantityNum
            }
          })

          if (updatedGift) {
            res
              .status(200)
              .json({
                message: 'Gift updated successfully.'
              })
            return
          }
        }

        res
          .status(403)
          .json({
            message: 'This user is not the wedding creator.'
          })
      } catch (error) {
        res.status(500).json({ message: 'Server error.' })
      }
    }
  }
)

export default updateGiftRouter
