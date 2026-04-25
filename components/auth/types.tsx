import { User } from "firebase/auth";

export interface GoogleLoginState {
  loading: boolean;
  user: User | null;
}

export interface GoogleLoginContextType extends GoogleLoginState {
  signInWithGoogle: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

export type GoogleLoginScreenProps = {
  signInWithGoogle: () => Promise<void>;
  loading: boolean;
};

export type SuccessScreenProps = {
  user: User;
  handleLogout: () => Promise<void>;
};