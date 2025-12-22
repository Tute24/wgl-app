import { createStore } from 'zustand/vanilla';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthStoreState = {
  token: string | null;
  hasHydrated: boolean;
};

type AuthStoreAction = {
  setToken: (token: string | null) => void;
};

export type AuthStore = AuthStoreState & AuthStoreAction;

const defaultInitState: AuthStoreState = {
  token: null,
  hasHydrated: false,
};

export const createAuthStore = (initState: AuthStoreState = defaultInitState) => {
  return createStore(
    persist<AuthStore>(
      (set) => ({
        ...initState,
        setToken: (token) => set((store) => ({ ...store, token })),
      }),
      {
        name: 'auth-store',
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
