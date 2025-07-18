'use client'

import { useContextWrap } from '@/contextAPI/context'
import signInSchema from '@/zodSchemas/signInSchema'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

export default function useSignIn() {
  type signInData = z.infer<typeof signInSchema>
  const { setStatusMessage } = useContextWrap()
  const router = useRouter()
  const apiURL = process.env.NEXT_PUBLIC_API_URL
  async function loginSubmitHandler(usersSign: signInData) {
    try {
      const response = await axios.post(`${apiURL}/auth/sign-in`, usersSign)
      if (response.status === 200) {
        const userToken = response.data.token
        localStorage.setItem('userToken', JSON.stringify(userToken))
        router.push('/dashboard')
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setStatusMessage(`This email doesn't belong to an existent user.`)
        }
        if (error.response?.status === 401) {
          setStatusMessage('Incorrect password. Try again!')
        }
        if (error.response?.status === 500) {
          setStatusMessage('Something went wrong. Try again!')
        }
      }
      console.log(error)
    }
  }

  return loginSubmitHandler
}
