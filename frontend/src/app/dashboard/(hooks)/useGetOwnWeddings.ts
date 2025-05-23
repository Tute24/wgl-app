'use client'

import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function useGetOwnWeddings() {
  const { userToken, setOwnWeddingsArray } = useContextWrap()
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
            }
          )
          if (response.status === 200) {
            setOwnWeddingsArray(response.data.own)
          }
        } catch (error) {
          AxiosErrorHandler({ error, route })
        }
    }

    getWeddings()
  }, [userToken])
}
