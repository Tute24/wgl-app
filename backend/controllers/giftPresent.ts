import express, { Router, Response } from 'express'
import isAuthenticated, {
  CustomRequest
} from '../middleware/authMiddleware'
import { prisma } from '../app'
const giftPresentRouter: Router = express.Router()

giftPresentRouter.post(
  '/giftPresent',
  isAuthenticated,
  async (req: CustomRequest, res: Response) => {
    const userID = req.authUser?.id
    const { id } = req.query
    const { giftID } = req.body
    const { quantity } = req.body
    const quantityGifted = Number(quantity)

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
        const newQuantity = gift.quantity - quantityGifted
        const updateGift = await prisma.gifts.update({
          where: {
            id: giftID
          },
          data: {
            quantity: newQuantity
          }
        })

        await prisma.giftedBy.create({
          data: {
            presenter: userID,
            relatedWedding: Number(id),
            quantity: quantityGifted,
            gift_reference: giftID
          }
        })

        if (updateGift) {
          console.log('yes')
          res.status(200).json({
            message: 'Presente gifted successfully.'
          })
        }
      } catch (error) {
        res.status(500).json({ message: 'Server error.' })
      }
    }
  }
)

export default giftPresentRouter
