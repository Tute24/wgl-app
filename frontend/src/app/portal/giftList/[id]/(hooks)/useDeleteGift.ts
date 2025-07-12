import { AxiosApi } from '@/common/axios-api/axios-api'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { useRouter } from 'next/navigation'

export default function useDeleteGift() {
  const { setGiftsArray, giftsArray } = useContextWrap()
  const route = useRouter()
  async function deleteGift(giftID: number) {
    const identifier = {
      giftID,
    }
    try {
      const response = await AxiosApi({
        httpMethod: 'post',
        route: '/gifts/delete',
        data: identifier,
      })

      if (response.status === 200) {
        const filteredGiftsArrays = giftsArray.filter(
          (gift) => gift.id !== giftID,
        )
        setGiftsArray(filteredGiftsArrays)
      }
    } catch (error) {
      AxiosErrorHandler({ error, route })
    }
  }
  return deleteGift
}
