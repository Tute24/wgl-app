import express from 'express'
const app = express()
import { PrismaClient } from '@prisma/client'
require('dotenv').config()

app.use(express.json())
const prisma = new PrismaClient()

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Application running on ${port}`)
})