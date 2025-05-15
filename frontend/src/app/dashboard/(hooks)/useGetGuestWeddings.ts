'use client'

import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function useGetGuestWeddings() {
  const { userToken, setGuestWeddingsArray } = useContextWrap()
  const route = useRouter()
  useEffect(() => {
    async function getWeddings() {
      if (userToken)
        try {
          const response = await axios.get(
            'http://localhost:3000/getWeddings',
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            },
          )
          if (response.status === 200) {
            setGuestWeddingsArray(response.data.invited)
          }
        } catch (error) {
          AxiosErrorHandler({ error, route })
        }
    }

    getWeddings()
  }, [userToken])
}
