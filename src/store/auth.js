import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    () => ({
      token: null,
      profile: null,
      setToken: token => set(state => ({ token })),
      setProfile: token => set(state => ({ profile })),
    }),
    { name: 'auth' },
  ),
)
