'use client';

import { createContext, ReactNode, useContext } from 'react';
import { createWeddingsStore, WeddingsStore } from './weddings.store';
import { useStore } from 'zustand';

type WeddingsStoreApi = ReturnType<typeof createWeddingsStore>;

const WeddingsStoreContext = createContext<WeddingsStoreApi | undefined>(undefined);

interface WeddingsStoreProviderProps {
  children: ReactNode;
}

export const weddingStoreInstance = createWeddingsStore();

export const WeddingsStoreProvider = ({ children }: WeddingsStoreProviderProps) => {
  return (
    <WeddingsStoreContext.Provider value={weddingStoreInstance}>
      {children}
    </WeddingsStoreContext.Provider>
  );
};

export const useWeddingsStore = <T,>(selector: (store: WeddingsStore) => T): T => {
  const weddingsStoreContext = useContext(WeddingsStoreContext);

  if (!weddingsStoreContext) {
    throw new Error('useWeddingsStore must be used within its context');
  }

  return useStore(weddingsStoreContext, selector);
};
