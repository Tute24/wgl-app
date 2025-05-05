import express, {Response, Router} from 'express'
import resetPasswordAuth, { ResetPasswordRequest } from '../middleware/resetPasswordMiddleware'
const resetPassword: Router = express.Router()

resetPassword.post('/resetPassword',resetPasswordAuth,async (req: ResetPasswordRequest, res:Response)=>{
    const userID = req.authData?.id
    const 
})