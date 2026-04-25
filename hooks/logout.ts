import { useRouter } from "expo-router";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            const auth = getAuth();
            await signOut(auth);

            await AsyncStorage.removeItem("user");

            router.replace("/auth"); // optional redirect
          } catch {
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  return { handleLogout };
};