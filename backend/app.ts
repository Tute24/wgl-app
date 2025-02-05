import express from 'express'
const app = express()
import { PrismaClient } from '@prisma/client'
require('dotenv').config()
const cors = require ('cors')
import userCreate from './controllers/createUser'
import logInRoute from './controllers/logIn'

app.use(express.json())
app.use(cors())
export const prisma = new PrismaClient()
app.use(userCreate)
app.use(logInRoute)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Application running on ${port}`)
})