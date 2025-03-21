import express, { Router, Response } from 'express'
const createListRoute: Router = express.Router()
import isAuthenticated, { CustomRequest } from '../middleware/authMiddleware'
import { prisma } from '../app'
import giftProps from '../types/giftProps'



createListRoute.post(
  '/createList',
  isAuthenticated,
  async (req: CustomRequest, res: Response) => {
    const { listTitle, weddingDate, shippingAddress } = req.body
    const giftsArray = req.body.gifts
    const userID = req.authUser?.id

    const user = await prisma.users.findUnique({
      where: {
        id: userID,
      },
    })

    if (!user) {
      res.status(404).json({ message: 'User not found.' })
      return
    }
    if (userID) {
      try {
        const newWedding = await prisma.weddings.create({
          data: {
            weddingTitle: listTitle,
            weddingDate: weddingDate,
            createdBy: userID,
            shippingAddress: shippingAddress
          },
        })

        console.log('Wedding successfully created!')

        const newGifts = ( giftsArray.map(async (giftInfo: giftProps) => {
           await prisma.gifts.create({
            data: {
              quantity: Number(giftInfo.quantity),
              productName: giftInfo.productName,
              productLink: giftInfo.productLink,
              fromWedding: newWedding.id
            },
          })
        }))

        res.status(200).json({
          message: 'Information successfully submitted to the database',
        })
        return
      } catch (error) {
        res.status(500).json({ message: 'Server Error!' })
        return
      }
    }
  }
)

export default createListRoute
