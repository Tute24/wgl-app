import express from 'express'
const app = express()
import { PrismaClient } from '@prisma/client'
require('dotenv').config()
const cors = require ('cors')
import userCreate from './controllers/createUser'

app.use(express.json())
app.use(cors())
export const prisma = new PrismaClient()
app.use(userCreate)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Application running on ${port}`)
})