import { create } from 'zustand'

interface RegisterFlowState {
  email: string
  password: string
  fullName: string
  location: string
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setProfile: (fullName: string, location: string) => void
  reset: () => void
}

export const useRegisterFlowStore = create<RegisterFlowState>((set) => ({
  email: '',
  password: '',
  fullName: '',
  location: '',

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setProfile: (fullName, location) => set({ fullName, location }),

  reset: () => set({ email: '', password: '', fullName: '', location: '' }),
}))
