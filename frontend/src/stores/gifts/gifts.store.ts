import { createStore } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface weddingGiftsProps {
  weddingId: number
  quantity: number
  productName: string
  productLink: string
}

export interface listHeaderProps {
  weddingId: number
  listHeaderTitle: string
  listHeaderDate: string
}

export type GiftsStoreState = {
  weddingGifts: weddingGiftsProps[] | []
  listHeader: listHeaderProps | null
  isCreator: boolean
  isGuest: boolean
  hasHydrated: boolean
}

const defaultInitState: GiftsStoreState = {
  weddingGifts: [],
  listHeader: null,
  isCreator: false,
  isGuest: false,
  hasHydrated: false,
}

export type GiftsStoreActions = {
  setWeddingGifts: (weddingsGifts: weddingGiftsProps[] | []) => void
  setListHeader: (listHeader: listHeaderProps | null) => void
  setIsCreator: (isCreator: boolean) => void
  setIsGuest: (isGuest: boolean) => void
  setDefaultInitState: () => void
}

export type GiftsStore = GiftsStoreState & GiftsStoreActions

export const createGiftsStore = (
  initState: GiftsStoreState = defaultInitState,
) => {
  return createStore<GiftsStore>()(
    persist(
      (set) => ({
        ...initState,
        setWeddingGifts: (weddingGifts) =>
          set((store) => ({ ...store, weddingGifts })),
        setListHeader: (listHeader) =>
          set((store) => ({ ...store, listHeader })),
        setIsCreator: (isCreator) => set((store) => ({ ...store, isCreator })),
        setIsGuest: (isGuest) => set((store) => ({ ...store, isGuest })),
        setDefaultInitState: () => set(() => ({ ...defaultInitState })),
      }),
      {
        name: 'gifts-store',
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
