'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import AxiosErrorHandler from './axios-error-handler'

export default function useLogOut() {
  const route = useRouter()

  async function logOut() {
    const userToken = JSON.parse(localStorage.getItem('userToken') ?? 'null')

    if (userToken) {
      try {
        const response = await axios.get('http://localhost:3000/logOut', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })

        if (response.status === 200) {
          localStorage.removeItem('userToken')
          route.push('/')
        }
      } catch (error: unknown) {
        AxiosErrorHandler({ error, route })
      }
    }
  }
  return logOut
}
