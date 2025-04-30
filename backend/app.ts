import express from 'express'
const app = express()
import { PrismaClient } from '@prisma/client'
require('dotenv').config()
const cors = require('cors')
import userCreate from './controllers/createUser'
import logInRoute from './controllers/logIn'
import logOutRoute from './controllers/logOut'
import createListRoute from './controllers/createList'
import getWeddings from './controllers/getWeddings'
import getListRoute from './controllers/getList'
import makeRequestRoute from './controllers/makeRequest'
import getReqRoute from './controllers/getRequests'
import acceptRequestRoute from './controllers/acceptRequest'
import denyRequestRoute from './controllers/denyRequest'
import giftPresentRouter from './controllers/giftPresent'
import updateGiftRouter from './controllers/updateGift'
import deleteGiftRouter from './controllers/deleteGift'
import createNewGiftRouter from './controllers/createNewGift'
import deleteWeddingRouter from './controllers/deleteWedding'
import getGiftedProducts from './controllers/getGiftedProducts'
import sendRecorverEmail from './controllers/sendRecoverPassword'

app.use(express.json())
app.use(cors())
export const prisma = new PrismaClient()
app.use(userCreate)
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
app.use(sendRecorverEmail)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Application running on ${port}`)
})
