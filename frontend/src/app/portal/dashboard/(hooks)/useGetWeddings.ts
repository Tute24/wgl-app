'use client'

import { AxiosApi } from '@/common/axios-api/axios-api'
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { useWeddingsStore } from '@/stores/weddings/weddings.provider'
import { useRouter } from 'next/navigation'
import { useShallow } from 'zustand/shallow'
import { useGeneralStore } from '@/stores/general/general.provider'

export default function useGetWeddings() {
  const route = useRouter()
  const { setOwnWeddings, setInvitedWeddings } = useWeddingsStore(
    useShallow((store) => ({
      setOwnWeddings: store.setOwnWeddings,
      setInvitedWeddings: store.setInvitedWeddings,
    })),
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
        setOwnWeddings(response.data.ownWeddings)
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
