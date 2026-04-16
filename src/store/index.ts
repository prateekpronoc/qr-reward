import { create } from 'zustand'
import { User, Reward } from '../types'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, role: 'customer' | 'admin') => void
  logout: () => void
  setUser: (user: User) => void
}

interface RewardStore {
  currentReward: Reward | null
  setCurrentReward: (reward: Reward) => void
  clearCurrentReward: () => void
}

// Mock user data for demo
const mockCustomer: User = {
  id: 'cust_001',
  email: 'customer@example.com',
  phone: '+91-9876543210',
  name: 'John Doe',
  role: 'customer',
  createdAt: new Date().toISOString(),
}

const mockAdmin: User = {
  id: 'admin_001',
  email: 'admin@example.com',
  phone: '+91-9999999999',
  name: 'Admin User',
  role: 'admin',
  createdAt: new Date().toISOString(),
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (_email: string, _password: string, role: 'customer' | 'admin') => {
    const user = role === 'admin' ? mockAdmin : mockCustomer
    set({ user, isAuthenticated: true })
    localStorage.setItem('auth_user', JSON.stringify(user))
  },
  logout: () => {
    set({ user: null, isAuthenticated: false })
    localStorage.removeItem('auth_user')
  },
  setUser: (user) => {
    set({ user, isAuthenticated: true })
    localStorage.setItem('auth_user', JSON.stringify(user))
  },
}))

export const useRewardStore = create<RewardStore>((set) => ({
  currentReward: null,
  setCurrentReward: (reward) => set({ currentReward: reward }),
  clearCurrentReward: () => set({ currentReward: null }),
}))
