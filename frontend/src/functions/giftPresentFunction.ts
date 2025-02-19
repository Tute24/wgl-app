import { useContextWrap } from '@/contextAPI/context'
import giftsProps from '@/types/giftsProps'
import axios from 'axios'
import { useEffect } from 'react'

export default function useGiftPresent() {
  const { isGiftSent, userToken, sendGiftObj, setGiftsArray } = useContextWrap()

  useEffect(() => {
    async function giftPresent() {
      if (isGiftSent) {
        try {
          const response = await axios.post(
            'http://localhost:3000/giftPresent',
            sendGiftObj,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          )

          if (response.status === 200) {
            setGiftsArray((prevGifts: giftsProps[]) =>
              prevGifts.map((item) =>
                item.id === sendGiftObj.giftID
                  ? {
                      ...item,
                      quantity: item.quantity - Number(sendGiftObj.quantity),
                    }
                  : item
              )
            )
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              console.log('User not authenticated.')
            }
            if (error.response?.status === 403) {
              console.log('Invalid/Expired token.')
            }
            if (error.response?.status === 404) {
              console.log('User/Gift not found.')
            }
            if (error.response?.status === 500) {
              console.log('Server error.')
            }
          }

          console.log(error)
        }
      }
    }

    giftPresent()
  }, [isGiftSent])
}
