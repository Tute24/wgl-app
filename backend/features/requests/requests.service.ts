/* eslint-disable space-before-function-paren */
import dayjs from 'dayjs'
import { prisma } from '../../app'
import { AppError } from '../../classes/app-error'

type Wedding = {
  id: number
  createdAt: Date | null
  weddingTitle: string
  weddingDate: string
  shippingAddress: string
  createdBy: string
}

type Request = {
  id: number
  requestBy: string
  relatedWedding: number
  requestByName: string
  weddingTitle: string
  pending: boolean
  accepted: boolean
  madeOn: Date | null
}

export async function acceptRequestService(
  userID: string,
  reqID: number
) {
  const user = await prisma.users.findUnique({
    where: {
      id: userID
    },
    include: {
      weddingsOwn: true
    }
  })

  if (!user) {
    throw new AppError('User not found', 404)
  }

  const requestData = await prisma.requests.findUnique({
    where: {
      id: reqID
    }
  })

  if (!requestData) {
    throw new AppError(
      "Couldn't find this request on the database.",
      404
    )
  }

  const filterWedding = user.weddingsOwn.filter(
    (wedding: Wedding) =>
      wedding.id === requestData.relatedWedding
  )

  if (filterWedding.length === 0) {
    throw new AppError(
      'This user is not the wedding creator.',
      403
    )
  }

  if (requestData.pending === false) {
    throw new AppError(
      'This request has already been reviewed.',
      409
    )
  }

  const updatedRequest = await prisma.requests.update({
    where: {
      id: reqID
    },
    data: {
      accepted: true,
      pending: false
    }
  })
  if (updatedRequest) {
    const message = 'Request accepted successfully'
    return { message }
  }
}

export async function makeRequestService(
  userID: string,
  weddingID: number
) {
  const user = await prisma.users.findUnique({
    where: {
      id: userID
    }
  })

  const checkWedding = await prisma.weddings.findUnique({
    where: {
      id: weddingID
    }
  })

  if (!user) {
    throw new AppError('User not found', 404)
  }

  if (!checkWedding) {
    throw new AppError(
      "Couldn't find this wedding's list",
      404
    )
  }

  await prisma.requests.create({
    data: {
      requestBy: userID,
      relatedWedding: weddingID,
      weddingTitle: checkWedding.weddingTitle,
      requestByName: `${user.firstName} ${user.lastName}`
    }
  })
  const message = 'Request successfull.'
  return { message }
}

export async function denyRequestService(
  userID: string,
  reqID: number
) {
  const user = await prisma.users.findUnique({
    where: {
      id: userID
    },
    include: {
      weddingsOwn: true
    }
  })

  if (!user) {
    throw new AppError('User not found', 404)
  }

  const requestData = await prisma.requests.findUnique({
    where: {
      id: reqID
    }
  })

  if (!requestData) {
    throw new AppError(
      "Couldn't find this request on the database.",
      404
    )
  }

  const filterWedding = user.weddingsOwn.filter(
    (wedding: Wedding) =>
      wedding.id === requestData.relatedWedding
  )

  if (filterWedding.length === 0) {
    throw new AppError(
      'This user is not the wedding creator.',
      403
    )
  }

  if (requestData.pending === false) {
    throw new AppError(
      'This request has already been reviewed.',
      409
    )
  }

  await prisma.requests.update({
    where: {
      id: reqID
    },
    data: {
      pending: false
    }
  })

  const message = 'Request denied successfully.'
  return {
    message
  }
}

export async function getRequestsService(
  userID: string,
  onlyPending: boolean = false
) {
  const user = await prisma.users.findUnique({
    where: {
      id: userID
    },
    include: {
      weddingsOwn: true
    }
  })

  if (!user) {
    throw new AppError('User not found.', 404)
  }

  const ownWeddingsIDArray = user.weddingsOwn.map(
    (wedding: Wedding) => wedding.id
  )

  const requestsHistory = await Promise.all(
    ownWeddingsIDArray.map(async (ids: number) => {
      return await prisma.requests.findMany({
        where: {
          relatedWedding: ids
        }
      })
    })
  )

  const requests = requestsHistory.flatMap((request) =>
    request.map((req:Request) => ({
      ...req,
      madeOn: dayjs(req.madeOn).format('YYYY-MM-DD')
    }))
  )

  if (onlyPending) {
    const pendingRequests = requests.filter(
      (request) => request.pending === true
    ).length

    return {
      pendingRequests
    }
  }
  return {
    requests
  }
}
