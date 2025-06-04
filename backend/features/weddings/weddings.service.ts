import { prisma } from '../../app'
import { AppError } from '../../classes/app-error'
import giftProps from '../../types/giftProps'
import { weddingResponse } from './weddings.controller'

export async function createWeddingService(
  userID: string,
  listTitle: string,
  weddingDate: string,
  shippingAddress: string,
  giftsArray: giftProps[]
) {
  const user = await prisma.users.findUnique({
    where: {
      id: userID
    }
  })

  if (!user) {
    throw new AppError(
      "Couldn't find the user on the database.",
      404
    )
  }
  const newWedding = await prisma.weddings.create({
    data: {
      weddingTitle: listTitle,
      weddingDate,
      createdBy: userID,
      shippingAddress
    }
  })

  console.log('Wedding successfully created!')

  giftsArray.map(async (giftInfo: giftProps) => {
    await prisma.gifts.create({
      data: {
        quantity: Number(giftInfo.quantity),
        productName: giftInfo.productName,
        productLink: giftInfo.productLink,
        fromWedding: newWedding.id
      }
    })
  })

  const message =
    'Information successfully submitted to the database'
  return {
    message
  }
}

export async function getWeddingsService(userID: string) {
  let ownWeddings: weddingResponse[] | [] = []
  let guestWeddings: weddingResponse[] | [] = []
  const user = await prisma.users.findUnique({
    where: {
      id: userID
    },
    include: {
      weddingsGuest: true
    }
  })

  if (!user) {
    throw new AppError(
      "Couldn't find the user on the database.",
      404
    )
  }
  const userInfoObject = {
    userID: user.id,
    userName: user.firstName
  }

  const createdWeddings = await prisma.weddings.findMany({
    where: {
      createdBy: userID
    }
  })

  if (createdWeddings) {
    ownWeddings = createdWeddings
  }

  const mappedInvitedWeddings = await Promise.all(
    user.weddingsGuest.map(async (wedding) => {
      return await prisma.weddings.findUnique({
        where: {
          id: wedding.referencedWedding
        }
      })
    })
  )

  if (mappedInvitedWeddings) {
    const filteredMappedInvitedWeddings =
      mappedInvitedWeddings.filter(
        (wedding): wedding is weddingResponse =>
          wedding !== null
      )

    guestWeddings = filteredMappedInvitedWeddings
  }

  return {
    message: 'Success.',
    ownWeddings,
    guestWeddings,
    userInfo: userInfoObject
  }
}
