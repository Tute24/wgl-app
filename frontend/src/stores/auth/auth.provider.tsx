'use client';

import { createContext, ReactNode, useContext } from 'react';
import { AuthStore, createAuthStore } from './auth.store';
import { useStore } from 'zustand';

type AuthStoreApi = ReturnType<typeof createAuthStore>;

const AuthStoreContext = createContext<AuthStoreApi | undefined>(undefined);

interface AuthStoreProviderProps {
  children: ReactNode;
}

export const authStoreInstance = createAuthStore();

export const AuthStoreProvider = ({ children }: AuthStoreProviderProps) => {
  return (
    <AuthStoreContext.Provider value={authStoreInstance}>{children}</AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error('useAuthStore must be used within its context');
  }

  return useStore(authStoreContext, selector);
};
