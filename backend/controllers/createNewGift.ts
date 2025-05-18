import express, { Router, Response } from 'express'
import isAuthenticated, {
  CustomRequest
} from '../middleware/authMiddleware'
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

    const checkWedding = await prisma.weddings.findUnique({
      where: {
        id: weddingID
      }
    })

    if (!checkWedding) {
      res
        .status(404)
        .json({ message: 'That wedding does not exist.' })
      return
    }

    if (userID) {
      try {
        const existentGifts = await prisma.gifts.findMany({
          where: {
            fromWedding: weddingID
          }
        })
        const existentNames = new Set(
          existentGifts.map((gift) =>
            gift.productName.trim().toLowerCase()
          )
        )

        const conflictingGifts = newGiftsArray.filter(
          (gift) =>
            existentNames.has(
              gift.productName.trim().toLowerCase()
            )
        )

        if (conflictingGifts.length > 0) {
          res.status(409).json({
            message: `Conflict - Gifts with the same name as existent ones can't be submitted.`,
            conflictingGiftNames: conflictingGifts.map(
              (g) => g.productName
            )
          })
          return
        }
        await Promise.all(
          newGiftsArray.map(async (giftInfo: giftProps) => {
            await prisma.gifts.create({
              data: {
                quantity: Number(giftInfo.quantity),
                productName: giftInfo.productName,
                productLink: giftInfo.productLink,
                fromWedding: weddingID
              }
            })
          })
        )

        const newGifts = await prisma.gifts.findMany({
          where: {
            fromWedding: weddingID
          }
        })
        res.status(200).json({
          message: 'Gifts created successfully',
          newGifts
        })
      } catch (error) {
        res.status(500).json({ message: 'Server error.' })
      }
    }
  }
)

export default createNewGiftRouter
