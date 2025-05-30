import { prisma } from '../../app'
import { AppError } from '../../classes/app-error'

export async function updateGiftService(
  userID: string,
  productName: string,
  productLink: string,
  quantity: number,
  giftID: number
) {
  if (!userID) {
    throw new AppError(
      "Couldn't find the user on the database.",
      404
    )
  }

  const gift = await prisma.gifts.findUnique({
    where: {
      id: giftID
    }
  })

  if (!gift) {
    throw new AppError(
      "Couldn't find this gift on the database.",
      404
    )
  }

  const wedding = await prisma.weddings.findUnique({
    where: {
      id: gift.fromWedding
    }
  })

  if (wedding?.createdBy === userID) {
    await prisma.gifts.update({
      where: {
        id: giftID
      },
      data: {
        productLink,
        productName,
        quantity
      }
    })

    const message = 'Gifted updated successfully.'
    return { message }
  }

  throw new AppError(
    'This user is not the wedding creator',
    403
  )
}

export async function giftPresentService(
  userID: string,
  weddingID: number,
  giftID: number,
  quantity: number
) {
  if (!userID) {
    throw new AppError(
      "Couldn't find the user on the database.",
      404
    )
  }

  const gift = await prisma.gifts.findUnique({
    where: {
      id: giftID
    }
  })

  if (!gift) {
    throw new AppError(
      "Couldn't find this gift on the database.",
      404
    )
  }

  const newQuantity = gift.quantity - quantity
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
      relatedWedding: weddingID,
      quantity,
      giftName: updateGift.productName
    }
  })

  const message = 'Present gifted successfully.'
  return { message }
}
