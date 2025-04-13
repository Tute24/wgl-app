'use client'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function useGetData() {
  const { id } = useParams()
  const weddingID = Number(id)
  const {
    userToken,
    setWeddingData,
    setGiftsArray,
    setIsCreator,
    setNotGuest,
    notGuest,
  } = useContextWrap()
  const route = useRouter()

  useEffect(() => {
    if (!userToken) return

    async function getData() {
      try {
        const response = await axios.get('http://localhost:3000/getList', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          params: {
            id: weddingID,
          },
        })

        setWeddingData(response.data.wedding)
        setGiftsArray(response.data.wedding.gifts)
        if (response.data.checkAdmin.isCreator === true) {
          setIsCreator(true)
        } else {
          setIsCreator(false)
        }
      } catch (error) {
        AxiosErrorHandler({error,setNotGuest,notGuest,route})
      }
    }
    getData()
    console.log('fetching')
  }, [userToken])
}
