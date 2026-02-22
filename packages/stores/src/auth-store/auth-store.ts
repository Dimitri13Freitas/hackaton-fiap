import { create } from "zustand";
import { User } from "@repo/domain";
import { signOutUseCase } from "@repo/infra";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  setLoading: (loading) => set({ isLoading: loading }),

  logout: async () => {
    // Importe o auth do seu firebase.ts compartilhado
    // await auth.signOut();
    await signOutUseCase.execute();
    set({ user: null, isAuthenticated: false });
  },
}));
