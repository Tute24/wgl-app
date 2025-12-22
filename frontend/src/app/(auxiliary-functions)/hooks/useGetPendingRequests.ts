import { useGeneralStore } from '@/stores/general/general.provider';
import { useShallow } from 'zustand/shallow';
import AxiosErrorHandler from '../axios-error-handler';
import { AxiosApi } from '@/common/axios-api/axios-api';

export function useGetPendingRequests() {
  const { setPendingRequests } = useGeneralStore(
    useShallow((store) => ({
      setPendingRequests: store.setPendingRequests,
    })),
  );

  async function getPendingRequests() {
    try {
      const response = await AxiosApi({
        httpMethod: 'get',
        route: '/requests/pending-requests',
      });

      if (response.status === 200) {
        setPendingRequests(response.data.pendingRequests);
      }
    } catch (error) {
      AxiosErrorHandler({ error });
    }
  }
  return getPendingRequests;
}
