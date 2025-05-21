import express from 'express'
import { PrismaClient } from '@prisma/client'
import logInRoute from './base/logIn'
import logOutRoute from './base/logOut'
import createListRoute from './base/createList'
import getWeddings from './base/getWeddings'
import getListRoute from './base/getList'
import makeRequestRoute from './base/makeRequest'
import getReqRoute from './base/getRequests'
import acceptRequestRoute from './base/acceptRequest'
import denyRequestRoute from './base/denyRequest'
import giftPresentRouter from './base/giftPresent'
import updateGiftRouter from './base/updateGift'
import deleteGiftRouter from './base/deleteGift'
import createNewGiftRouter from './base/createNewGift'
import deleteWeddingRouter from './base/deleteWedding'
import getGiftedProducts from './base/getGiftedProducts'
import sendRecoverEmail from './base/sendRecoverEmail'
import resetPassword from './base/resetPassword'
import { usersRouter } from './features/users/users.routes'
const app = express()
require('dotenv').config()
const cors = require('cors')

app.use(express.json())
app.use(cors())
export const prisma = new PrismaClient()
app.use('/users', usersRouter)
app.use(logInRoute)
app.use(logOutRoute)
app.use(createListRoute)
app.use(getWeddings)
app.use(getListRoute)
app.use(makeRequestRoute)
app.use(getReqRoute)
app.use(acceptRequestRoute)
app.use(denyRequestRoute)
app.use(giftPresentRouter)
app.use(updateGiftRouter)
app.use(deleteGiftRouter)
app.use(createNewGiftRouter)
app.use(deleteWeddingRouter)
app.use(getGiftedProducts)
app.use(sendRecoverEmail)
app.use(resetPassword)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Application running on ${port}`)
})
