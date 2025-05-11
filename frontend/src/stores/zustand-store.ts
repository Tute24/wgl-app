import { create } from 'zustand'
type UsernameStoreState = { username: string | null }
type UsernameStoreAction = {
  setUsername: (nextUsername: UsernameStoreState['username']) => void
}
type UsernameStore = UsernameStoreState & UsernameStoreAction
export const useUsernameStore = create<UsernameStore>((set) => ({
  username: null,
  setUsername: (nextUsername) => set({ username: nextUsername }),
}))
