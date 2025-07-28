import { createStore } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface requestsResponseProps {
  madeOn: string
  id: number
  weddingTitle: string
  requestBy: string
  relatedWedding: number
  requestByName: string
  pending: boolean
  accepted: boolean
}

export type RequestsStoreState = {
  requests: requestsResponseProps[] | []
  hasHydrated: boolean
}

export type RequestsStoreActions = {
  setRequests: (requests: requestsResponseProps[] | []) => void
}

export type RequestsStore = RequestsStoreState & RequestsStoreActions

const defaultInitState: RequestsStoreState = {
  requests: [],
  hasHydrated: false,
}

export const createRequestsStore = (
  initState: RequestsStoreState = defaultInitState,
) => {
  return createStore<RequestsStore>()(
    persist(
      (set) => ({
        ...initState,
        setRequests: (requests) => set((store) => ({ ...store, requests })),
      }),
      {
        name: 'requests-store',
        storage: createJSONStorage(() => sessionStorage),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.hasHydrated = true
          }
        },
      },
    ),
  )
}
