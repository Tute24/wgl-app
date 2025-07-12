'use client'

import { AxiosApi } from '@/common/axios-api/axios-api'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { useAuthStore } from '@/stores/auth/auth.provider'
import { useRouter } from 'next/navigation'

export default function useGetGuestWeddings() {
  const { setGuestWeddingsArray } = useContextWrap()
  const token = useAuthStore((store) => store.token)
  const route = useRouter()

  async function getWeddings() {
    if (token)
      try {
        const response = await AxiosApi({
          httpMethod: 'get',
          route: '/weddings/get',
        })
        if (response.status === 200) {
          setGuestWeddingsArray(response.data.guestWeddings)
        }
      } catch (error) {
        AxiosErrorHandler({ error, route })
      }
  }
  return getWeddings
}
