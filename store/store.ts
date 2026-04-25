// store/userStore.ts
import { create } from "zustand";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type Timestamp = FirebaseFirestoreTypes.Timestamp;
type FieldValue = FirebaseFirestoreTypes.FieldValue;

export interface UserData {
  firebaseUid: string;
  phoneNumber: string;
  email: string;
  name: string;
  profilePictureUrl: string;
  preferredLanguage: string;
  role: "user" | "admin";
  isActive: boolean;
  isBanned: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  emailMarketingOptIn: boolean;
  notificationEnabled: boolean;
  defaultAddressId?: string;
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
  lastLogin: Timestamp | FieldValue;
  deletedAt: Timestamp | FieldValue | null;
}

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