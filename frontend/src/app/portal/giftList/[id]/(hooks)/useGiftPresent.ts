'use client'
import { AxiosApi } from '@/common/axios-api/axios-api'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import giftsProps from '@/types-props/giftsProps'
import { useParams, useRouter } from 'next/navigation'

export default function useGiftPresent() {
  const { setGiftsArray, setSelectedGiftID } = useContextWrap()
  const { id } = useParams()
  const route = useRouter()
  async function giftPresent(giftID: number, quantity: number) {
    const sendGiftObj = {
      giftID,
      quantity,
    }
    if (sendGiftObj) {
      try {
        const response = await AxiosApi({
          httpMethod: 'post',
          route: '/gifts/present',
          data: sendGiftObj,
          params: {
            id: Number(id),
          },
        })

        if (response.status === 200) {
          setSelectedGiftID(0)
          setGiftsArray((prevGifts: giftsProps[]) =>
            prevGifts.map((item) =>
              item.id === sendGiftObj.giftID
                ? {
                    ...item,

                    quantity: item.quantity - Number(sendGiftObj.quantity),
                  }
                : item,
            ),
          )
        }
      } catch (error) {
        AxiosErrorHandler({ error, route })
      }
    }
  }

  return giftPresent
}
