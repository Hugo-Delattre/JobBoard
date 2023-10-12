import { create } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  // isAdmin: boolean;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  // isAdmin: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));
