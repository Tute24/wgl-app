import { create } from 'zustand'

const useUsernameStore = create((set) => ({
  username: null,
  setUsername: (firstName: string) => set({ username: firstName }),
}))
