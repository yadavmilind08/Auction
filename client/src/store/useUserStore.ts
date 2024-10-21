import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../types/User";

interface UserStore {
  user: IUser | null;
  setUser: (userData: IUser) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (userData: IUser) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-store",
    }
  )
);

export default useUserStore;
