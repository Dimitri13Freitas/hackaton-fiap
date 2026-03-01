import { create } from "zustand";
import { User } from "@repo/domain";
import { signOutUseCase, signInUseCase, signUpUseCase } from "@repo/infra";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  setLoading: (loading) => set({ isLoading: loading }),

  login: async ({ email, password }) => {
    set({ isAuthenticated: false, isLoading: true });
    try {
      const responseUser = await signInUseCase.execute({ email, password });
      set({ user: responseUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async ({ name, email, password }) => {
    set({ isAuthenticated: false, isLoading: true });
    try {
      const responseUser = await signUpUseCase.execute({
        name,
        email,
        password,
      });
      set({ user: responseUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await signOutUseCase.execute();
    set({ user: null, isAuthenticated: false });
  },
}));
