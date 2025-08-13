import { AxiosApi } from '@/common/axios-api/axios-api'
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import { useRouter } from 'next/navigation'
import { useShallow } from 'zustand/shallow'
import { useGeneralStore } from '@/stores/general/general.provider'

export default function useDeleteGift() {
  const { setWeddingGifts, weddingGifts } = useGiftsStore(
    useShallow((store) => ({
      setWeddingGifts: store.setWeddingGifts,
      weddingGifts: store.weddingGifts,
    })),
  )
  const { setIsLoading } = useGeneralStore(
    useShallow((store) => ({
      setIsLoading: store.setIsLoading,
    })),
  )
  const route = useRouter()
  async function deleteGift(giftID: number) {
    const identifier = {
      giftID,
    }
    try {
      setIsLoading(true)
      const response = await AxiosApi({
        httpMethod: 'post',
        route: '/gifts/delete',
        data: identifier,
      })

      if (response.status === 200) {
        setWeddingGifts(weddingGifts.filter((gift) => gift.Id !== giftID))
      }
    } catch (error) {
      AxiosErrorHandler({ error, route })
    } finally {
      setIsLoading(false)
    }
  }
  return deleteGift
}
