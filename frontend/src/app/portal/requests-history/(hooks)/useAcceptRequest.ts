import { AxiosApi } from '@/common/axios-api/axios-api';
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler';
import { useRequestsStore } from '@/stores/requests/requests.provider';
import { useShallow } from 'zustand/shallow';
import { useGeneralStore } from '@/stores/general/general.provider';

export function useAcceptRequest() {
  const { requests, setRequests, filteredRequests, setFilteredRequests } = useRequestsStore(
    useShallow((store) => ({
      requests: store.requests,
      setRequests: store.setRequests,
      filteredRequests: store.filteredRequests,
      setFilteredRequests: store.setFilteredRequests,
    })),
  );
  const { setIsLoading } = useGeneralStore(
    useShallow((store) => ({
      setIsLoading: store.setIsLoading,
    })),
  );

  async function acceptRequest(reqID: number) {
    try {
      setIsLoading(true);
      const response = await AxiosApi({
        httpMethod: 'post',
        data: {
          reqID,
        },
        route: '/requests/accept',
      });

      if (response.status === 200) {
        setRequests(
          requests.map((request) =>
            request.id === reqID ? { ...request, pending: false, accepted: true } : request,
          ),
        );
        setFilteredRequests(
          filteredRequests.map((request) =>
            request.id === reqID ? { ...request, pending: false, accepted: true } : request,
          ),
        );
      }
    } catch (error) {
      AxiosErrorHandler({ error });
    } finally {
      setIsLoading(false);
    }
  }
  return acceptRequest;
}
