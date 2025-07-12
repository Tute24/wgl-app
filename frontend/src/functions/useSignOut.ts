'use client'

import { useRouter } from 'next/navigation'
import AxiosErrorHandler from './axios-error-handler'
import { authStoreInstance } from '@/stores/auth/auth.provider'
import { AxiosApi } from '@/common/axios-api/axios-api'

export default function useLogOut() {
  const setToken = authStoreInstance.getState().setToken
  const route = useRouter()
  async function logOut() {
    const userToken = JSON.parse(localStorage.getItem('userToken') ?? 'null')

    if (userToken) {
      try {
        const response = await AxiosApi({
          httpMethod: 'get',
          route: '/auth/sign-out',
        })

        if (response.status === 200) {
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
