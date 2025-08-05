'use client'

import { AxiosApi } from '@/common/axios-api/axios-api'
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { useWeddingsStore } from '@/stores/weddings/weddings.provider'
import { useRouter } from 'next/navigation'
import { useShallow } from 'zustand/shallow'
import { useGeneralStore } from '@/stores/general/general.provider'

export default function useGetGuestWeddings() {
  const route = useRouter()
  const setInvitedWeddings = useWeddingsStore(
    useShallow((store) => store.setInvitedWeddings),
  )
  const { setIsRendering } = useGeneralStore(
    useShallow((store) => ({
      setIsRendering: store.setIsRendering,
    })),
  )

  async function getWeddings() {
    try {
      setIsRendering(true)
      const response = await AxiosApi({
        httpMethod: 'get',
        route: '/weddings/get',
      })

      if (response.status === 200) {
        setInvitedWeddings(response.data.guestWeddings)
      }
    } catch (error) {
      AxiosErrorHandler({ error, route })
    } finally {
      setIsRendering(false)
    }
  }
  return getWeddings
}
