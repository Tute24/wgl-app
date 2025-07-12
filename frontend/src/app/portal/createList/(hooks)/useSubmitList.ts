import { AxiosApi } from '@/common/axios-api/axios-api'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import newListSchema from '@/zodSchemas/newListSchema'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

export default function useSubmitList() {
  type listData = z.infer<typeof newListSchema>
  const { setStatusMessage } = useContextWrap()
  const route = useRouter()

  async function submitList(data: listData) {
    console.log(data)
    try {
      const response = await AxiosApi({
        httpMethod: 'post',
        route: '/weddings/create',
        data,
      })

      if (response.status === 200) {
        setStatusMessage('Wedding created successfully!')
      }
    } catch (error) {
      AxiosErrorHandler({ error, setStatusMessage, route })
    }
  }

  return submitList
}
