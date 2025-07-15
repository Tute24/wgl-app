'use client'
import { AxiosApi } from '@/common/axios-api/axios-api'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { useParams, useRouter } from 'next/navigation'

export default function useGetData() {
  const { id } = useParams()
  const weddingID = Number(id)
  const {
    setWeddingData,
    setGiftsArray,
    setIsCreator,
    setNotGuest,
    notGuest,
    setWeddingHeaderInfo,
  } = useContextWrap()
  const route = useRouter()
  async function getData() {
    try {
      const response = await AxiosApi({
        httpMethod: 'get',
        route: '/gifts/get',
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
      AxiosErrorHandler({
        error,
        setNotGuest,
        notGuest,
        route,
        setWeddingHeaderInfo,
      })
    }
  }
  return getData
}
