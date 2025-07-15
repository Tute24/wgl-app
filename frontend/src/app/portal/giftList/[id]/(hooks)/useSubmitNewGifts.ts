import { AxiosApi } from '@/common/axios-api/axios-api'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { newGiftsSchema } from '@/zodSchemas/giftsSchema'
import { useParams, useRouter } from 'next/navigation'
import { z } from 'zod'

export default function useSubmitNewGift() {
  const { id } = useParams()
  const weddingID = Number(id)
  const { userToken, setGiftsArray, setStatusMessage } = useContextWrap()
  const route = useRouter()
  type submitData = z.infer<typeof newGiftsSchema>
  async function submitNewGifts(data: submitData) {
    try {
      if (userToken) {
        const response = await AxiosApi({
          httpMethod: 'post',
          route: '/gifts/create',
          data: data.gifts,
          params: {
            id: weddingID,
          },
        })

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
