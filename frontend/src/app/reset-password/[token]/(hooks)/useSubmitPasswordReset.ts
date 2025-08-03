'use client'

import { useContextWrap } from '@/contextAPI/context'
import { newPassword } from '../page'
import { useParams } from 'next/navigation'
import axios from 'axios'
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'

export default function useSubmitPasswordReset() {
  const { setStatusMessage } = useContextWrap()
  const { token } = useParams()
  const apiURL = process.env.NEXT_PUBLIC_API_URL
  async function submitPasswordReset(data: newPassword) {
    if (data.password !== data.confirmPassword) {
      setStatusMessage('Passwords must be the same!')
    } else {
      try {
        const response = await axios.post(
          `${apiURL}/auth/reset-password`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.status === 200) {
          setStatusMessage(
            'Your password was updated successfully. Go back to the sign in page.',
          )
        }
      } catch (error) {
        AxiosErrorHandler({ error })
      }
    }
  }
  return submitPasswordReset
}
