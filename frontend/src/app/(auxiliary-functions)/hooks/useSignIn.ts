'use client'

import { axiosInstance } from '@/common/axios-api/axios-api'
import { authStoreInstance } from '@/stores/auth/auth.provider'
import { useGeneralStore } from '@/stores/general/general.provider'
import signInSchema from '@/zodSchemas/signInSchema'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useShallow } from 'zustand/shallow'

export default function useSignIn() {
  type signInData = z.infer<typeof signInSchema>
  const { setUsername, setStatusMessage } = useGeneralStore(
    useShallow((store) => ({
      setUsername: store.setUsername,
      setStatusMessage: store.setStatusMessage,
    })),
  )
  const router = useRouter()
  const setToken = authStoreInstance.getState().setToken
  async function loginSubmitHandler(usersSign: signInData) {
    try {
      const response = await axiosInstance.post('/auth/sign-in', usersSign)
      if (response.status === 200) {
        const userToken = response.data.token as string
        const userName = response.data.username as string
        setToken(userToken)
        setUsername(userName)
        router.push('/portal/dashboard')
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
