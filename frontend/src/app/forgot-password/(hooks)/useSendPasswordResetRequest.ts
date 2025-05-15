import { z } from 'zod'
import { emailSchema } from '../page'
import { useContextWrap } from '@/contextAPI/context'
import axios from 'axios'
import AxiosErrorHandler from '@/functions/axios-error-handler'

export default function useSendPasswordResetRequest() {
  type userEmail = z.infer<typeof emailSchema>
  const { setStatusMessage } = useContextWrap()

  async function sendPasswordResetRequest(data: userEmail) {
    if (data) {
      try {
        console.log(data)
        const response = await axios.post(
          'http://localhost:3000/sendRecoverEmail',
          data,
        )
        if (response.status === 200) {
          setStatusMessage(
            `If an account with that email exists, a password reset link has been sent. Please check your inbox.`,
          )
        }
      } catch (error) {
        AxiosErrorHandler({ error })
      }
    }
  }
  return sendPasswordResetRequest
}
