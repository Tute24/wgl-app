'use client'

import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { useUsernameStore } from '@/stores/zustand-store'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useStore } from 'zustand'

export default function useGetOwnWeddings() {
  const { userToken, setOwnWeddingsArray } = useContextWrap()
  const route = useRouter()
  const apiURL = process.env.NEXT_PUBLIC_API_URL
  const setUsername = useStore(useUsernameStore, (state) => state.setUsername)
  useEffect(() => {
    async function getWeddings() {
      if (userToken)
        try {
          const response = await axios.get(`${apiURL}/weddings/get`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
          if (response.status === 200) {
            setOwnWeddingsArray(response.data.ownWeddings)
            setUsername(response.data.userInfo.userName)
          }
        } catch (error) {
          AxiosErrorHandler({ error, route })
        }
    }

    getWeddings()
  }, [userToken])
}
