import express, { Router, Response } from 'express'
import isAuthenticated, { CustomRequest } from '../middleware/authMiddleware'
import { prisma } from '../app'
import giftProps from '../types/giftProps'
const createNewGiftRouter: Router = express.Router()

createNewGiftRouter.post(
  '/createNewGift',
  isAuthenticated,
  async (req: CustomRequest, res: Response) => {
    const userID = req.authUser?.id
    const weddingID = Number(req.query.id)
    const newGiftsArray: giftProps[] = req.body
    // const newGiftsArray: giftProps[] = body

    const user = await prisma.users.findUnique({
      where: {
        id: userID,
      },
    })

    const checkWedding = await prisma.weddings.findUnique({
      where: {
        id: weddingID,
      },
    })

    if (!user|| !checkWedding) {
      res.status(404).json({ message: 'User not found.' })
      return
    }

    if (userID) {
      try {
       const tryOut =  await Promise.all(
          newGiftsArray.map(async (giftInfo: giftProps) => {
            await prisma.gifts.create({
              data: {
                quantity: Number(giftInfo.quantity),
                productName: giftInfo.productName,
                productLink: giftInfo.productLink,
                fromWedding: weddingID,
              },
            })
          })
        )
        
        const newGifts = await prisma.gifts.findMany({
          where: {
            fromWedding: weddingID,
          },
        })
        res
          .status(200)
          .json({ message: 'Gifts created successfully', newGifts: newGifts })
        return
      } catch (error) {
        res.status(500).json({ message: 'Server error.' })
        return
      }
    }
  }
)

export default createNewGiftRouter
