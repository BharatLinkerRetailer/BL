// app/_layout.tsx
import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useURL } from "expo-linking";
import auth from "@react-native-firebase/auth";
import { useUserStore } from "../store/store";
import { syncUserWithFirestore } from "../firebase/user/user";

export default function RootLayout() {
  const router = useRouter();
  const url = useURL();
  const setUserData = useUserStore((state) => state.setUserData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await syncUserWithFirestore(user);
        setUserData(userData);
        
        if (url) {
          const path = url.replace("bl://", "");
          router.replace(path as any);
        } else {
          router.replace("/(home)/home");
        }
      } else {
        setUserData(null);
        router.replace("/auth");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [url]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="location" />
      <Stack.Screen name="(home)" />
      <Stack.Screen name="user" />
      <Stack.Screen name="(shop)" />
    </Stack>
  );
}