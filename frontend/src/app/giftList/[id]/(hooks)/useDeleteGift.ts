import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function useDeleteGift(giftID: number) {
  const { userToken, setGiftsArray, giftsArray } = useContextWrap()
  const route = useRouter()

  async function deleteGift() {
    const identifier = {
      giftID,
    }
    try {
      const response = await axios.post(
        'http://localhost:3000/deleteGift',
        identifier,
        {
          headers: {
            Authorization: `Bearer: ${userToken}`,
          },
        },
      )

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
