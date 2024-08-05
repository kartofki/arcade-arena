import {create }from 'zustand';

const userInfo = JSON.parse(localStorage.getItem("user-info"));

const useAuthStore = create((set) => ({
  user: userInfo ? userInfo : null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
  setUser: (user) => set({user})
}));

export default useAuthStore;
