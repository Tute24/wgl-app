import express, { Router, Response } from 'express'
import isAuthenticated, {
  CustomRequest
} from '../middleware/authMiddleware'
import { prisma } from '../app'
const getWeddings: Router = express.Router()

getWeddings.get(
  '/getWeddings',
  isAuthenticated,
  async (req: CustomRequest, res: Response) => {
    const userID = req.authUser?.id

    const user = await prisma.users.findUnique({
      where: {
        id: userID
      }
    })

    if (!user) {
      res.status(404).json({ message: 'User not found.' })
      return
    }
    if (userID) {
      try {
        const userInfoObject = {
          userID: user.id,
          userName: user.firstName
        }

        const createdWeddings =
          await prisma.weddings.findMany({
            where: {
              createdBy: userID
            }
          })

        console.log('Own Weddings fetched successfully.')

        const guestOn = await prisma.users.findUnique({
          where: {
            id: userID
          },
          include: {
            weddingsGuest: true
          }
        })

        const weddingsGuestArray = guestOn?.weddingsGuest

        const mappedWeddings = await Promise.all(
          weddingsGuestArray?.map(async (wedding) => {
            return await prisma.weddings.findUnique({
              where: {
                id: wedding.referencedWedding
              }
            })
          }) || []
        )

        console.log(
          'Weddings invited to fetched successfully.'
        )

        res.status(200).json({
          message: 'Success.',
          own: createdWeddings,
          invited: mappedWeddings,
          userInfo: userInfoObject
        })
      } catch (error) {
        res.status(500).json({ message: 'Server error.' })
      }
    }
  }
)

export default getWeddings
