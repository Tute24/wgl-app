import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function useMakeRequest(id: number) {
  const { userToken, setStatusMessage } = useContextWrap()
  const weddingID = id
  const route = useRouter()
  const apiURL = process.env.NEXT_PUBLIC_API_URL

  async function makeRequest() {
    const identifier = {
      weddingID,
    }

    if (userToken) {
      try {
        const response = await axios.post(
          `${apiURL}/requests/make`,
          identifier,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        )

        if (response.status === 200) {
          setStatusMessage(
            `Request made successfully! If the wedding list's admin accepts your request, you'll be able to see the list soon.`,
          )
        }
      } catch (error) {
        AxiosErrorHandler({ error, setStatusMessage, route })
      }
    }
  }

  return makeRequest
}
