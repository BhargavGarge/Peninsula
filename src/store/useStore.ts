import { create } from 'zustand';

interface User {
  email: string;
  name: string;
}

interface StoreState {
  user: User | null;
  isAuthenticated: boolean;
  viewMode: 'prompt' | 'traditional';
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  logout: () => void;
  toggleViewMode: () => void;
  setViewMode: (mode: 'prompt' | 'traditional') => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  isAuthenticated: false,
  viewMode: 'prompt',
  login: (email: string, password: string) => {
    // Mock login - in production, this would call an API
    set({
      user: { email, name: email.split('@')[0] },
      isAuthenticated: true,
    });
  },
  register: (email: string, password: string, name: string) => {
    // Mock registration - in production, this would call an API
    set({
      user: { email, name },
      isAuthenticated: true,
    });
  },
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
  toggleViewMode: () => {
    set((state) => ({
      viewMode: state.viewMode === 'prompt' ? 'traditional' : 'prompt',
    }));
  },
  setViewMode: (mode: 'prompt' | 'traditional') => {
    set({ viewMode: mode });
  },
}));
