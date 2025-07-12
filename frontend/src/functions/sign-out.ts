'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import AxiosErrorHandler from './axios-error-handler'
import { authStoreInstance } from '@/stores/auth/auth.provider'

export default function useLogOut() {
  const setToken = authStoreInstance.getState().setToken
  const route = useRouter()
  const apiURL = process.env.NEXT_PUBLIC_API_URL
  async function logOut() {
    const userToken = JSON.parse(localStorage.getItem('userToken') ?? 'null')

    if (userToken) {
      try {
        const response = await axios.get(`${apiURL}/auth/sign-out`, {
          headers: {
            Authorization: `Bearer: ${userToken}`,
          },
        })

        if (response.status === 200) {
          localStorage.removeItem('userToken')
          setToken(null)
          route.push('/')
        }
      } catch (error: unknown) {
        AxiosErrorHandler({ error, route })
      }
    }
  }
  return logOut
}
