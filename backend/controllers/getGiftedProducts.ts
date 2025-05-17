import express, { Router, Response } from 'express'
import isAuthenticated, {
  CustomRequest
} from '../middleware/authMiddleware'
import { prisma } from '../app'
import dayjs from 'dayjs'
const getGiftedProducts: Router = express.Router()

getGiftedProducts.get(
  '/getGiftedProducts',
  isAuthenticated,
  async (req: CustomRequest, res: Response) => {
    const userID = req.authUser?.id
    const { id } = req.query
    const weddingId = Number(id)

    const checkWedding = await prisma.weddings.findUnique({
      where: {
        id: weddingId
      }
    })

    if (!checkWedding) {
      res.status(404).json({
        message: "Couldn't find this wedding's list."
      })
      return
    }

    if (checkWedding.createdBy !== userID) {
      res.status(403).json({
        message: "You don't have access to this page."
      })
      return
    }

    if (userID) {
      try {
        const refWeddingGifted =
          await prisma.giftedBy.findMany({
            where: {
              relatedWedding: weddingId
            }
          })

        const mappingAddGifter = await Promise.all(
          refWeddingGifted.map(async (giftingRegister) => {
            const gifter = await prisma.users.findUnique({
              where: {
                id: giftingRegister.presenter
              }
            })

            const gift = await prisma.gifts.findUnique({
              where: {
                id: giftingRegister.gift_reference
              }
            })

            const wedding =
              await prisma.weddings.findUnique({
                where: {
                  id: giftingRegister.relatedWedding
                }
              })

            const returnObject = {
              id: giftingRegister.id,
              presenter: `${gifter?.firstName} ${gifter?.lastName}`,
              relatedWeddingTitle: wedding?.weddingTitle,
              relatedWeddingDate: wedding?.weddingDate,
              quantityGifted: giftingRegister.quantity,
              gift: gift?.productName,
              giftLink: gift?.productLink,
              giftedAt: dayjs(
                giftingRegister.giftedAt
              ).format('YYYY-MM-DD')
            }

            return returnObject
          })
        )
        res.status(200).json({
          message: 'Fetch successful!',
          giftedGifts: mappingAddGifter
        })
      } catch (error) {
        res.send(500).json({ message: 'Server error' })
      }
    }
  }
)

export default getGiftedProducts
