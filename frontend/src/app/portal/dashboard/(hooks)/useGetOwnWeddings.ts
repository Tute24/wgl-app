'use client'

import { AxiosApi } from '@/common/axios-api/axios-api'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { useAuthStore } from '@/stores/auth/auth.provider'
import { useUsernameStore } from '@/stores/zustand-store'
import { useRouter } from 'next/navigation'
import { useStore } from 'zustand'

export default function useGetOwnWeddings() {
  const { setOwnWeddingsArray } = useContextWrap()
  const route = useRouter()
  const setUsername = useStore(useUsernameStore, (state) => state.setUsername)
  const token = useAuthStore((store) => store.token)
  async function getWeddings() {
    if (token)
      try {
        const response = await AxiosApi({
          httpMethod: 'get',
          route: '/weddings/get',
        })
        if (response.status === 200) {
          setOwnWeddingsArray(response.data.ownWeddings)
          setUsername(response.data.userInfo.userName)
        }
      } catch (error) {
        AxiosErrorHandler({ error, route })
      }
  }
  return getWeddings
}
