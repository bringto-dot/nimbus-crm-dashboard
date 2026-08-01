import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthUser {
  email: string
  name: string
}

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string) => void
  logout: () => void
}

/** Derives a display name from the email local part: `anna.k` -> `Anna K`. */
function nameFromEmail(email: string): string {
  const local = email.split('@')[0] ?? 'user'
  return local
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email) =>
        set({ user: { email, name: nameFromEmail(email) }, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'crm-auth' },
  ),
)
