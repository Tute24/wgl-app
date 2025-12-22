'use client';

import { createContext, ReactNode, useContext } from 'react';
import { createGiftsStore, GiftsStore } from './gifts.store';
import { useStore } from 'zustand';

type GiftsStoreApi = ReturnType<typeof createGiftsStore>;

interface GiftsStoreProviderProps {
  children: ReactNode;
}

const GiftsStoreContext = createContext<GiftsStoreApi | undefined>(undefined);

export const giftsStoreInstance = createGiftsStore();

export const GiftsStoreProvider = ({ children }: GiftsStoreProviderProps) => {
  return (
    <GiftsStoreContext.Provider value={giftsStoreInstance}>{children}</GiftsStoreContext.Provider>
  );
};

export const useGiftsStore = <T,>(selector: (store: GiftsStore) => T): T => {
  const giftsStoreContext = useContext(GiftsStoreContext);

  if (!giftsStoreContext) {
    throw new Error('useGiftsStore must be used within its context');
  }

  return useStore(giftsStoreContext, selector);
};
