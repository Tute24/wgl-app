import express from 'express'
const app = express()
import { PrismaClient } from '@prisma/client'
require('dotenv').config()
const cors = require ('cors')

app.use(express.json())
app.use(cors())
const prisma = new PrismaClient()

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Application running on ${port}`)
})