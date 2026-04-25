// store/userStore.ts
import { create } from "zustand";
import {UserData} from "../../types/user/user"

interface UserStore {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
  clearUserData: () => set({ userData: null }),
}));