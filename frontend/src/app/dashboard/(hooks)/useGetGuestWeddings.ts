'use client'

import { useContextWrap } from '@/contextAPI/context'
import axios from 'axios'
import { useEffect } from 'react'

export default function useGetGuestWeddings() {
  const { userToken, setGuestWeddingsArray } = useContextWrap()
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
            setGuestWeddingsArray(response.data.invited)
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              console.log('User not authenticated.')
            }
            if (error.response?.status === 403) {
              console.log('Invalid/Expired token.')
            }
            if (error.response?.status === 404) {
              console.log('User not found.')
            }
            if (error.response?.status === 500) {
              console.log('Server error.')
            }
          }
        }
    }

    getWeddings()
  }, [userToken])
}
