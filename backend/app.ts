import express from 'express'
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
app.use('/users', usersRouter)
app.use('/requests', requestsRouter)
app.use('/auth', authRouter)
app.use('/gifts', giftsRouter)
app.use('/weddings', weddingsRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Application running on ${port}`)
})
