'use client'
import { AxiosApi } from '@/common/axios-api/axios-api'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import { listHeaderProps, weddingGiftsProps } from '@/stores/gifts/gifts.store'
import { useParams, useRouter } from 'next/navigation'
import { useShallow } from 'zustand/shallow'

export default function useGetGifts() {
  const { id } = useParams()
  const weddingID = Number(id)
  const { setNotGuest, notGuest, setWeddingHeaderInfo } = useContextWrap()
  const { setWeddingGifts, setIsCreator, setListHeader } = useGiftsStore(
    useShallow((store) => ({
      setWeddingGifts: store.setWeddingGifts,
      setListHeader: store.setListHeader,
      setIsCreator: store.setIsCreator,
    })),
  )
  const route = useRouter()
  async function getGifts() {
    try {
      const response = await AxiosApi({
        httpMethod: 'get',
        route: '/gifts/get',
        params: {
          id: weddingID,
        },
      })

      setWeddingGifts(
        response.data.responseObject.weddingGifts as weddingGiftsProps[],
      )
      setListHeader(response.data.responseObject.listHeader as listHeaderProps)
      setIsCreator(response.data.responseObject.checkAdmin.isCreator as boolean)
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
  return getGifts
}
