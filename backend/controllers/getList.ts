import express, { Router, Response } from 'express'
import isAuthenticated, { CustomRequest } from '../middleware/authMiddleware'
import { prisma } from '../app'
const getListRoute: Router = express.Router()

getListRoute.get(
  '/getList',
  isAuthenticated,
  async (req: CustomRequest, res: Response) => {
    const userID = req.authUser?.id
    const weddingID = Number(req.query.id)
    const checkAdmin = {
      isCreator: false,
    }

    const user = await prisma.users.findUnique({
      where: {
        id: userID,
      }
    })

    const checkWedding = await prisma.weddings.findUnique({
        where:{
            id: weddingID
        }
    })

    if (!user) {
      res.status(404).json({ message: 'User not found.' })
      return
    }

    if(!checkWedding){
        res.status(404).json({ message: `Couldn't find this wedding's list.` })
        return
      }

    if (userID) {
      try {
        const userPart = await prisma.users.findUnique({
          where: {
            id: userID,
          },
          include: {
            weddingsOwn: true,
            weddingsGuest: true,
          },
        })

        const checkCreatorArray = userPart?.weddingsOwn.filter(
          (weddings) => weddings.id === weddingID
        )

        if (checkCreatorArray?.length !== 0) {
          checkAdmin.isCreator= true
          const ownWedding = await prisma.weddings.findUnique({
            where: {
              id: weddingID,
            },
            include: {
                gifts: true
            }
          })
          res
            .status(200)
            .json({
              message: 'Success (owner)!',
              wedding: ownWedding,
              checkAdmin: checkAdmin,
            })
          return
        }

        const checkGuestArray = userPart?.weddingsGuest.filter(
          (guestOn) => guestOn.referencedWedding === weddingID
        )

        if (checkGuestArray?.length !== 0) {
          const guestOn = await prisma.weddings.findUnique({
            where: {
              id: weddingID,
            },
            include: {
                gifts: true
            }
          })
          res
            .status(200)
            .json({
              message: 'Succes (guest)!',
              wedding: guestOn,
              checkAdmin: checkAdmin,
            })
          return
        }

        res.status(403).json({ message: 'User is not a guest on this wedding' })
        return
      } catch (error) {
        res.status(500).json({ message: 'Server Error.' })
        return
      }
    }
  }
)

export default getListRoute
