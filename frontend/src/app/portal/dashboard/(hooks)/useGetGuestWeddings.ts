'use client'

import { AxiosApi } from '@/common/axios-api/axios-api'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { useWeddingsStore } from '@/stores/weddings/weddings.provider'
import { useRouter } from 'next/navigation'
import { useShallow } from 'zustand/shallow'

export default function useGetGuestWeddings() {
  const route = useRouter()
  const setInvitedWeddings = useWeddingsStore(
    useShallow((store) => store.setInvitedWeddings),
  )

  async function getWeddings() {
    try {
      const response = await AxiosApi({
        httpMethod: 'get',
        route: '/weddings/get',
      })
      if (response.status === 200) {
        setInvitedWeddings(response.data.guestWeddings)
      }
    } catch (error) {
      AxiosErrorHandler({ error, route })
    }
  }
  return getWeddings
}
