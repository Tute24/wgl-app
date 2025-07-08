import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type UsernameStoreState = { username: string | null }
type UsernameStoreAction = {
  setUsername: (nextUsername: UsernameStoreState['username']) => void
}
type UsernameStore = UsernameStoreState & UsernameStoreAction
export const useUsernameStore = create<UsernameStore>()(
  persist(
    (set) => ({
      username: null,
      setUsername: (nextUsername) => set({ username: nextUsername }),
    }),
    {
      name: 'username-storage',
    },
  ),
)
