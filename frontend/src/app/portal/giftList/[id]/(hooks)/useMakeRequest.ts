import { AxiosApi } from '@/common/axios-api/axios-api'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { useRouter } from 'next/navigation'
import { useGeneralStore } from '@/stores/general/general.provider'
import { useShallow } from 'zustand/shallow'

export default function useMakeRequest(id: number) {
  const { setStatusMessage } = useContextWrap()
  const { setIsLoading } = useGeneralStore(
    useShallow((store) => ({
      setIsLoading: store.setIsLoading,
    })),
  )
  const weddingID = id
  const route = useRouter()

  async function makeRequest() {
    const identifier = {
      weddingID,
    }

    try {
      setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  return makeRequest
}
