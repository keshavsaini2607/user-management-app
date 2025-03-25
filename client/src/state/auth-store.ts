import { create } from 'zustand'

type AuthState = {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  login: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => set(() => ({ isAuthenticated: value })),
  login: (token: string) => {
    document.cookie = `auth-token=${token}; path=/`
    set({ isAuthenticated: true })
  },
  logout: () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    set({ isAuthenticated: false })
    window.location.href = '/'
  },
}))
