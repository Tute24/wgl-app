import express, { Router, Response } from 'express'
import isAuthenticated, {
  CustomRequest
} from '../middleware/authMiddleware'
import { prisma } from '../app'
import giftProps from '../types/giftProps'
const createListRoute: Router = express.Router()

createListRoute.post(
  '/createList',
  isAuthenticated,
  async (req: CustomRequest, res: Response) => {
    const { listTitle, weddingDate, shippingAddress } =
      req.body
    const giftsArray = req.body.gifts
    const userID = req.authUser?.id

    if (userID) {
      try {
        const newWedding = await prisma.weddings.create({
          data: {
            weddingTitle: listTitle,
            weddingDate,
            createdBy: userID,
            shippingAddress
          }
        })

        console.log('Wedding successfully created!')

        await giftsArray.map(
          async (giftInfo: giftProps) => {
            await prisma.gifts.create({
              data: {
                quantity: Number(giftInfo.quantity),
                productName: giftInfo.productName,
                productLink: giftInfo.productLink,
                fromWedding: newWedding.id
              }
            })
          }
        )

        res.status(200).json({
          message:
            'Information successfully submitted to the database'
        })
      } catch (error) {
        res.status(500).json({ message: 'Server Error!' })
      }
    }
  }
)

export default createListRoute
