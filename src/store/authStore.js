import create from 'zustand';

const useAuthStore = ((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));

export default useAuthStore 
