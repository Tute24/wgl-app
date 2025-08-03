'use client'
import { AxiosApi } from '@/common/axios-api/axios-api'
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import { listHeaderProps, weddingGiftsProps } from '@/stores/gifts/gifts.store'
import { useParams, useRouter } from 'next/navigation'
import { useShallow } from 'zustand/shallow'

export default function useGetGifts() {
  const { id } = useParams()
  const weddingID = Number(id)
  const { setWeddingGifts, setIsCreator, setListHeader, setIsGuest } =
    useGiftsStore(
      useShallow((store) => ({
        setWeddingGifts: store.setWeddingGifts,
        setListHeader: store.setListHeader,
        setIsCreator: store.setIsCreator,
        setIsGuest: store.setIsGuest,
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
      if (response.status === 200) {
        setIsCreator(
          response.data.responseObject.checkPreferences.isCreator as boolean,
        )
        setIsGuest(
          response.data.responseObject.checkPreferences.isGuest as boolean,
        )
        setListHeader(
          response.data.responseObject.listHeader as listHeaderProps,
        )
        setWeddingGifts(
          response.data.responseObject.weddingGifts as weddingGiftsProps[],
        )
      }
    } catch (error) {
      AxiosErrorHandler({
        error,
        route,
      })
    }
  }
  return getGifts
}
