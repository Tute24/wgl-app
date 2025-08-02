import { AxiosApi } from '@/common/axios-api/axios-api'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { useRequestsStore } from '@/stores/requests/requests.provider'
import { useShallow } from 'zustand/shallow'

export function useAcceptRequest() {
  const { requests, setRequests } = useRequestsStore(
    useShallow((store) => ({
      requests: store.requests,
      setRequests: store.setRequests,
    })),
  )
  async function acceptRequest(reqID: number) {
    try {
      const response = await AxiosApi({
        httpMethod: 'post',
        data: {
          reqID,
        },
        route: '/requests/accept',
      })

      if (response.status === 200) {
        setRequests(
          requests.map((request) =>
            request.id === reqID
              ? { ...request, pending: false, accepted: true }
              : request,
          ),
        )
      }
    } catch (error) {
      AxiosErrorHandler({ error })
    }
  }
  return acceptRequest
}
