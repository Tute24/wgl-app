import { AxiosApi } from '@/common/axios-api/axios-api'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { useRequestsStore } from '@/stores/requests/requests.provider'
import { useShallow } from 'zustand/shallow'

export default function useGetRequests() {
  const { setRequests } = useRequestsStore(
    useShallow((store) => ({
      setRequests: store.setRequests,
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
      }
    } catch (error) {
      AxiosErrorHandler({ error })
    }
  }
  return getRequests
}
