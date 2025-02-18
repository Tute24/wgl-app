import express, { Router, Response } from 'express'
import isAuthenticated, { CustomRequest } from '../middleware/authMiddleware'
import { prisma } from '../app'
const giftPresentRouter: Router = express.Router()

giftPresentRouter.post(
  '/giftPresent',
  isAuthenticated,
  async (req: CustomRequest, res: Response) => {
    const userID = req.authUser?.id
    const { giftID } = req.body
    const { quantity } = req.body
    const quantityGifted = Number(quantity)

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

    try {
      const newQuantity = gift.quantity - quantityGifted
      const updateGiftedBy = await prisma.gifts.update({
        where: {
          id: giftID,
        },
        data: {
          giftedBy: user.id,
          quantity: newQuantity
        },
      })

      if (updateGiftedBy) {
        res.status(200).json({ message: 'Presente gifted successfully.' })
        return
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error.' })
      return
    }
  }
)

export default giftPresentRouter
