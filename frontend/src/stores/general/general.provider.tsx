'use client';

import { createContext, ReactNode, useContext } from 'react';
import { createGeneralStore, GeneralStore } from './general.store';
import { useStore } from 'zustand';

export type GeneralStoreApi = ReturnType<typeof createGeneralStore>;

interface GeneralStoreProviderProps {
  children: ReactNode;
}

export const GeneralStoreContext = createContext<GeneralStoreApi | undefined>(undefined);

export const generalStoreInstance = createGeneralStore();

export const GeneralStoreProvider = ({ children }: GeneralStoreProviderProps) => {
  return (
    <GeneralStoreContext.Provider value={generalStoreInstance}>
      {children}
    </GeneralStoreContext.Provider>
  );
};

export const useGeneralStore = <T,>(selector: (store: GeneralStore) => T): T => {
  const generalStoreContext = useContext(GeneralStoreContext);

  if (!generalStoreContext) {
    throw new Error('useGeneralStore must be used within its context');
  }

  return useStore(generalStoreContext, selector);
};
