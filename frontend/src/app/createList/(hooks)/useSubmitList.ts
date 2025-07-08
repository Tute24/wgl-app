import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import newListSchema from '@/zodSchemas/newListSchema'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

export default function useSubmitList() {
  type listData = z.infer<typeof newListSchema>
  const { userToken, setStatusMessage } = useContextWrap()
  const apiURL = process.env.NEXT_PUBLIC_API_URL
  const route = useRouter()

  async function submitList(data: listData) {
    if (userToken) {
      console.log(data)
      try {
        const response = await axios.post(`${apiURL}/weddings/create`, data, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })

        if (response.status === 200) {
          setStatusMessage('Wedding created successfully!')
        }
      } catch (error) {
        AxiosErrorHandler({ error, setStatusMessage, route })
      }
    }
  }

  return submitList
}
