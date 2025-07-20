import { AxiosApi } from '@/common/axios-api/axios-api'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import { newGiftsSchema } from '@/zodSchemas/giftsSchema'
import { useParams, useRouter } from 'next/navigation'
import { z } from 'zod'
import { useShallow } from 'zustand/shallow'

export default function useSubmitNewGift() {
  const { id } = useParams()
  const weddingID = Number(id)
  const { setStatusMessage } = useContextWrap()
  const setWeddingGifts = useGiftsStore(
    useShallow((store) => store.setWeddingGifts),
  )
  const route = useRouter()
  type submitData = z.infer<typeof newGiftsSchema>
  async function submitNewGifts(data: submitData) {
    try {
      const response = await AxiosApi({
        httpMethod: 'post',
        route: '/gifts/create',
        data: data.gifts,
        params: {
          id: weddingID,
        },
      })

      if (response.status === 200) {
        setWeddingGifts(response.data.newGifts)
      }
    } catch (error) {
      AxiosErrorHandler({ error, setStatusMessage, route })
    }
  }
  return submitNewGifts
}
