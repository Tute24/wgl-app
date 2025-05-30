import express from 'express'
import { PrismaClient } from '@prisma/client'
import createListRoute from './base/createList'
import getWeddings from './base/getWeddings'
import getListRoute from './base/getList'
import giftPresentRouter from './base/giftPresent'
import deleteGiftRouter from './base/deleteGift'
import createNewGiftRouter from './base/createNewGift'
import deleteWeddingRouter from './base/deleteWedding'
import getGiftedProducts from './base/getGiftedProducts'
import { usersRouter } from './features/users/users.routes'
import { requestsRouter } from './features/requests/requests.routes'
import { authRouter } from './features/auth/auth.routes'
import { giftsRouter } from './features/gifts/gifts.routes'
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
app.use(createListRoute)
app.use(getWeddings)
app.use(getListRoute)
app.use(giftPresentRouter)
app.use(deleteGiftRouter)
app.use(createNewGiftRouter)
app.use(deleteWeddingRouter)
app.use(getGiftedProducts)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Application running on ${port}`)
})
