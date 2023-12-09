import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    set => ({
      token: null,
      profile: null,
      setToken: token => set(state => ({ token })),
      setProfile: profile => set(state => ({ profile })),
    }),
    { name: 'auth' },
  ),
)
