import express from 'express'
import { PrismaClient } from '@prisma/client'
import getWeddings from './base/getWeddings'
import deleteWeddingRouter from './base/deleteWedding'
import { usersRouter } from './features/users/users.routes'
import { requestsRouter } from './features/requests/requests.routes'
import { authRouter } from './features/auth/auth.routes'
import { giftsRouter } from './features/gifts/gifts.routes'
import { weddingsRouter } from './features/weddings/weddings.routes'
const app = express()
require('dotenv').config()
const cors = require('cors')

app.use(express.json())
app.use(cors())
export const prisma = new PrismaClient()
app.use('/users', usersRouter)
app.use('/requests', requestsRouter)
app.use('/auth', authRouter)
app.use('/gifts', giftsRouter)
app.use('/weddings', weddingsRouter)
app.use(getWeddings)
app.use(deleteWeddingRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Application running on ${port}`)
})
