import dayjs from 'dayjs'
import { prisma } from '../../app'
import { AppError } from '../../classes/app-error'
import giftProps from '../../types/giftProps'

export async function updateGiftService(
  userID: string,
  productName: string,
  productLink: string,
  quantity: number,
  giftID: number
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

export async function deleteGiftService(
  userID: string,
  giftID: number
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

  const gift = await prisma.gifts.findUnique({
    where: {
      id: giftID
    }
  })

  if (!gift) {
    throw new AppError(
      "Couldn't find the gift on the database.",
      404
    )
  }

  const wedding = await prisma.weddings.findUnique({
    where: {
      id: gift.fromWedding
    }
  })

  if (wedding?.createdBy === userID) {
    await prisma.gifts.delete({
      where: {
        id: giftID
      }
    })

    const message = 'Gift deleted successfully.'
    return { message }
  } else {
    throw new AppError(
      'This user is not the wedding creator.',
      403
    )
  }
}

export async function createGiftService(
  userID: string,
  weddingID: number,
  newGiftsArray: giftProps[]
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

  const checkWedding = await prisma.weddings.findUnique({
    where: {
      id: weddingID
    }
  })

  if (!checkWedding) {
    throw new AppError(
      "Couldn't find the wedding on the database.",
      404
    )
  }

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

  const conflictingGifts = newGiftsArray.filter((gift) =>
    existentNames.has(gift.productName.trim().toLowerCase())
  )

  if (conflictingGifts.length > 0) {
    throw new AppError(
      "Conflict - Gifts with the same name as existent ones can't be submitted.",
      409
    )
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
  const message = 'Gifts created successfully'

  return {
    newGifts,
    message
  }
}

export async function getGiftsService(
  userID: string,
  weddingID: number
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

  const checkWedding = await prisma.weddings.findUnique({
    where: {
      id: weddingID
    }
  })

  if (!checkWedding) {
    throw new AppError(
      "Couldn't find the wedding on the database.",
      404
    )
  }

  const checkAdmin = {
    isCreator: false
  }

  const userPart = await prisma.users.findUnique({
    where: {
      id: userID
    },
    include: {
      weddingsOwn: true,
      weddingsGuest: true
    }
  })

  const checkCreatorArray = userPart?.weddingsOwn.filter(
    (weddings) => weddings.id === weddingID
  )

  if (checkCreatorArray?.length !== 0) {
    checkAdmin.isCreator = true
    const ownWedding = await prisma.weddings.findUnique({
      where: {
        id: weddingID
      },
      include: {
        gifts: true
      }
    })
    const message = 'Success (owner)!'
    const wedding = ownWedding
    return {
      message,
      wedding,
      checkAdmin
    }
  }

  const checkGuestArray = userPart?.weddingsGuest.filter(
    (guestOn) => guestOn.referencedWedding === weddingID
  )

  if (checkGuestArray?.length !== 0) {
    const guestOn = await prisma.weddings.findUnique({
      where: {
        id: weddingID
      },
      include: {
        gifts: true
      }
    })
    const message = 'Success (guest)!'
    const wedding = guestOn
    return {
      message,
      wedding,
      checkAdmin
    }
  }
  const weddingInfo = {
    weddingID: checkWedding.id,
    weddingTitle: checkWedding.weddingTitle,
    weddingDate: checkWedding.weddingDate
  }

  throw new AppError(
    'User is not a guest on this wedding',
    403,
    weddingInfo
  )
}

export async function getGiftedProductsService(
  userID: string,
  weddingID: number
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

  const checkWedding = await prisma.weddings.findUnique({
    where: {
      id: weddingID
    }
  })

  if (!checkWedding) {
    throw new AppError(
      "Couldn't find the wedding on the database.",
      404
    )
  }

  if (checkWedding.createdBy !== userID) {
    throw new AppError(
      "You don't have access to this page.",
      403
    )
  }

  const refWeddingGifted = await prisma.giftedBy.findMany({
    where: {
      relatedWedding: weddingID
    }
  })

  const mappingAddGifter = await Promise.all(
    refWeddingGifted.map(async (giftingRegister) => {
      const gifter = await prisma.users.findUnique({
        where: {
          id: giftingRegister.presenter
        }
      })

      const giftOnCreatedBy =
        await prisma.giftedBy.findFirst({
          where: {
            giftName: giftingRegister.giftName
          }
        }) // goes by the assumption that the wedding won't have two rows with the same product name

      const wedding = await prisma.weddings.findUnique({
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
        gift: giftOnCreatedBy?.giftName,
        giftedAt: dayjs(giftingRegister.giftedAt).format(
          'YYYY-MM-DD'
        )
      }

      return returnObject
    })
  )
  const message = 'Fetch successful!'
  const giftedProducts = mappingAddGifter

  return {
    message,
    giftedProducts
  }
}
