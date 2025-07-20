'use client'

import { AxiosApi } from '@/common/axios-api/axios-api'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { useWeddingsStore } from '@/stores/weddings/weddings.provider'
import { useUsernameStore } from '@/stores/zustand-store'
import { useRouter } from 'next/navigation'
import { useStore } from 'zustand'
import { useShallow } from 'zustand/shallow'

export default function useGetOwnWeddings() {
  const route = useRouter()
  const setUsername = useStore(useUsernameStore, (store) => store.setUsername)
  const setOwnWeddings = useWeddingsStore(
    useShallow((store) => store.setOwnWeddings),
  )

  async function getWeddings() {
    try {
      const response = await AxiosApi({
        httpMethod: 'get',
        route: '/weddings/get',
      })
      if (response.status === 200) {
        setOwnWeddings(response.data.ownWeddings)
        setUsername(response.data.userInfo.userName)
      }
    } catch (error) {
      AxiosErrorHandler({ error, route })
    }
  }
  return getWeddings
}
