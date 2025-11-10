import { AxiosApi } from '@/common/axios-api/axios-api'
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { useRequestsStore } from '@/stores/requests/requests.provider'
import { useShallow } from 'zustand/shallow'
import { useGeneralStore } from '@/stores/general/general.provider'

export default function useGetRequests() {
  const { setRequests, setFilteredRequests } = useRequestsStore(
    useShallow((store) => ({
      setRequests: store.setRequests,
      setFilteredRequests: store.setFilteredRequests,
    })),
  )
  const { setIsRendering } = useGeneralStore(
    useShallow((store) => ({
      setIsRendering: store.setIsRendering,
    })),
  )
  async function getRequests() {
    try {
      setIsRendering(true)
      const response = await AxiosApi({
        httpMethod: 'get',
        route: '/requests/get',
      })

      if (response.status === 200) {
        setRequests(response.data.requests)
        setFilteredRequests(response.data.requests)
      }
    } catch (error) {
      AxiosErrorHandler({ error })
    } finally {
      setIsRendering(false)
    }
  }
  return getRequests
}
