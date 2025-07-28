import { createContext, useContext } from 'react'
import { createRequestsStore, RequestsStore } from './requests.store'
import { useStore } from 'zustand'

type RequestsApi = ReturnType<typeof createRequestsStore>

const RequestsStoreContext = createContext<RequestsApi | undefined>(undefined)

const requestsStoreInstance = createRequestsStore()

export function RequestsStoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RequestsStoreContext.Provider value={requestsStoreInstance}>
      {children}
    </RequestsStoreContext.Provider>
  )
}

export const useRequestsStore = <T,>(
  selector: (store: RequestsStore) => T,
): T => {
  const requestsStoreContext = useContext(RequestsStoreContext)

  if (!requestsStoreContext) {
    throw new Error('useRequestsStore must be used within its context')
  }

  return useStore(requestsStoreContext, selector)
}
