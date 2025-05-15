'use client'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import giftsProps from '@/types-props/giftsProps'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'

export default function useGiftPresent(giftID: number, quantity: string) {
  const { userToken, setGiftsArray } = useContextWrap()
  const { id } = useParams()

  const sendGiftObj = {
    giftID,
    quantity,
  }
  const route = useRouter()
  async function giftPresent() {
    if (sendGiftObj) {
      try {
        const response = await axios.post(
          'http://localhost:3000/giftPresent',
          sendGiftObj,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
            params: {
              id: Number(id),
            },
          },
        )

        if (response.status === 200) {
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
