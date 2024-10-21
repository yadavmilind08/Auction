import { create } from "zustand";
import { IUser } from "../types/User";

interface UserStore {
  user: IUser | null;
  setUser: (userData: IUser) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
