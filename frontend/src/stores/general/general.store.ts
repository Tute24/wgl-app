import { generalModalProps } from '@/types-props/general-modal-props'
import { createStore } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type GeneralStoreState = {
  isLoading: boolean
  isRendering: boolean
  statusMessage: string
  pendingRequests: number
  username: string
  modalObject: generalModalProps | null
  hasHydrated: boolean
}

const defaultInitState: GeneralStoreState = {
  isLoading: false,
  isRendering: false,
  statusMessage: '',
  pendingRequests: 0,
  username: '',
  modalObject: null,
  hasHydrated: false,
}

export type GeneralStoreActions = {
  setIsLoading: (isLoading: boolean) => void
  setIsRendering: (isRendering: boolean) => void
  setStatusMessage: (statusMessage: string) => void
  setPendingRequests: (pendingRequests: number) => void
  setUsername: (username: string) => void
  setModalObject: (modalObject: generalModalProps | null) => void
  setDefaultInitState: () => void
}

export type GeneralStore = GeneralStoreState & GeneralStoreActions

export const createGeneralStore = (
  initState: GeneralStoreState = defaultInitState,
) => {
  return createStore<GeneralStore>()(
    persist(
      (set) => ({
        ...initState,
        setIsLoading: (isLoading) => set((store) => ({ ...store, isLoading })),
        setIsRendering: (isRendering) =>
          set((store) => ({ ...store, isRendering })),
        setStatusMessage: (statusMessage) =>
          set((store) => ({ ...store, statusMessage })),
        setPendingRequests: (pendingRequests) =>
          set((store) => ({ ...store, pendingRequests })),
        setUsername: (username) => set((store) => ({ ...store, username })),
        setModalObject: (modalObject) =>
          set((store) => ({ ...store, modalObject })),
        setDefaultInitState: () => set(() => ({ ...defaultInitState })),
      }),
      {
        name: 'general-store',
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
