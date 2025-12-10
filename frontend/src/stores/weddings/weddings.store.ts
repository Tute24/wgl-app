import { createStore } from 'zustand/vanilla';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface WeddingsProps {
  id: number;
  weddingTitle: string;
  weddingDate: string;
  shippingAddress?: string;
  createdBy: string;
}

export type WeddingsStoreState = {
  ownWeddings: WeddingsProps[] | [];
  invitedWeddings: WeddingsProps[] | [];
  hasHydrated: boolean;
};

const defaultInitState: WeddingsStoreState = {
  ownWeddings: [],
  invitedWeddings: [],
  hasHydrated: false,
};

export type WeddingsStoreAction = {
  setOwnWeddings: (weddings: WeddingsProps[] | []) => void;
  setInvitedWeddings: (weddings: WeddingsProps[] | []) => void;
  setDefaultInitState: () => void;
};

export type WeddingsStore = WeddingsStoreState & WeddingsStoreAction;

export const createWeddingsStore = (initState: WeddingsStoreState = defaultInitState) => {
  return createStore(
    persist<WeddingsStore>(
      (set) => ({
        ...initState,
        setOwnWeddings: (ownWeddings) => set((store) => ({ ...store, ownWeddings })),
        setInvitedWeddings: (invitedWeddings) => set((store) => ({ ...store, invitedWeddings })),
        setDefaultInitState: () => set(() => ({ ...defaultInitState })),
      }),
      {
        name: 'weddings-store',
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
