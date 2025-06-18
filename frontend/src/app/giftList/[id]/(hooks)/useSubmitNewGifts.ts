import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { newGiftsSchema } from '@/zodSchemas/giftsSchema'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { z } from 'zod'

export default function useSubmitNewGift() {
  const { id } = useParams()
  const weddingID = Number(id)
  const { userToken, setGiftsArray, setStatusMessage } = useContextWrap()
  const apiURL = process.env.NEXT_PUBLIC_API_URL
  const route = useRouter()
  type submitData = z.infer<typeof newGiftsSchema>

  async function submitNewGifts(data: submitData) {
    try {
      if (userToken) {
        const response = await axios.post(
          `${apiURL}/gifts/create`,
          data.gifts,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
            params: {
              id: weddingID,
            },
          },
        )

        if (response.status === 200) {
          setGiftsArray(response.data.newGifts)
        }
      }
    } catch (error) {
      AxiosErrorHandler({ error, setStatusMessage, route })
    }
  }
  return submitNewGifts
}
