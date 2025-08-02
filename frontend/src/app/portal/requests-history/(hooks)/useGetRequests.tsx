import { AxiosApi } from '@/common/axios-api/axios-api'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { useRequestsStore } from '@/stores/requests/requests.provider'
import { useShallow } from 'zustand/shallow'

export default function useGetRequests() {
  const { setRequests, setFilteredRequests } = useRequestsStore(
    useShallow((store) => ({
      setRequests: store.setRequests,
      setFilteredRequests: store.setFilteredRequests,
    })),
  )
  async function getRequests() {
    try {
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
    }
  }
  return getRequests
}
