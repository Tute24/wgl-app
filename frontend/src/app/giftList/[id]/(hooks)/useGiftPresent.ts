'use client'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import giftsProps from '@/types-props/giftsProps'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'

export default function useGiftPresent() {
  const { userToken, setGiftsArray, setSelectedGiftID } = useContextWrap()
  const { id } = useParams()
  const route = useRouter()
  const apiURL = process.env.NEXT_PUBLIC_API_URL
  async function giftPresent(giftID: number, quantity: number) {
    const sendGiftObj = {
      giftID,
      quantity,
    }
    if (sendGiftObj) {
      try {
        const response = await axios.post(
          `${apiURL}/gifts/present`,
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
