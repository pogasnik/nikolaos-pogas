import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserState {
  name: string
  token: string
  setUser: (name: string, token: string) => void
  logout: () => void
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      name: "",
      token: "",
      setUser: (name, token) => set({ name, token }),
      logout: () => set({ name: "", token: "" }),
    }),
    { name: "user-storage" } // saved in localStorage
  )
)
