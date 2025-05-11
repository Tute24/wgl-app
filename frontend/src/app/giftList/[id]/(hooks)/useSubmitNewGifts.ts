import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import giftCreateProps from '@/types-props/giftCreateProps'
import { newGiftsSchema } from '@/zodSchemas/giftsSchema'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { z } from 'zod'

export default function useSubmitNewGift() {
  const { id } = useParams()
  const weddingID = Number(id)
  const { userToken, setGiftsArray } = useContextWrap()
  const route = useRouter()
  type submitData = z.infer<typeof newGiftsSchema>

  async function submitNewGifts(data: submitData) {
    try {
      if (userToken) {
        const response = await axios.post(
          'http://localhost:3000/createNewGift',
          data.gifts,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
            params: {
              id: weddingID,
            },
          }
        )

        if (response.status === 200) {
          setGiftsArray(response.data.newGifts)
        }
      }
    } catch (error) {
      AxiosErrorHandler({ error, route })
    }
  }
  return submitNewGifts
}
