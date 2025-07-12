import { AxiosApi } from '@/common/axios-api/axios-api'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { useRouter } from 'next/navigation'

export default function useMakeRequest(id: number) {
  const { setStatusMessage } = useContextWrap()
  const weddingID = id
  const route = useRouter()

  async function makeRequest() {
    const identifier = {
      weddingID,
    }

    try {
      const response = await AxiosApi({
        httpMethod: 'post',
        route: '/requests/make',
        data: identifier,
      })

      if (response.status === 200) {
        setStatusMessage(
          `Request made successfully! If the wedding list's admin accepts your request, you'll be able to see the list soon.`,
        )
      }
    } catch (error) {
      AxiosErrorHandler({ error, setStatusMessage, route })
    }
  }

  return makeRequest
}
