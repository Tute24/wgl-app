import { createStore } from 'zustand/vanilla';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface requestsResponseProps {
  madeOn: string;
  id: number;
  weddingTitle: string;
  requestBy: string;
  relatedWedding: number;
  requestByName: string;
  pending: boolean;
  accepted: boolean;
}

export type RequestsStoreState = {
  requests: requestsResponseProps[] | [];
  filteredRequests: requestsResponseProps[] | [];
  hasHydrated: boolean;
};

export type RequestsStoreActions = {
  setRequests: (requests: requestsResponseProps[] | []) => void;
  setFilteredRequests: (filteredRequests: requestsResponseProps[] | []) => void;
};

export type RequestsStore = RequestsStoreState & RequestsStoreActions;

const defaultInitState: RequestsStoreState = {
  requests: [],
  filteredRequests: [],
  hasHydrated: false,
};

export const createRequestsStore = (initState: RequestsStoreState = defaultInitState) => {
  return createStore(
    persist<RequestsStore>(
      (set) => ({
        ...initState,
        setRequests: (requests) => set((store) => ({ ...store, requests })),
        setFilteredRequests: (filteredRequests) => set((store) => ({ ...store, filteredRequests })),
      }),
      {
        name: 'requests-store',
        storage: createJSONStorage(() => sessionStorage),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.hasHydrated = true;
          }
        },
      },
    ),
  );
};
