import {create }from 'zustand';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user-info")),
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
  setUser: (user) => set({user})
}));

export default useAuthStore;
