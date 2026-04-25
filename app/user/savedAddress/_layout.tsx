// app/user/savedAddress/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="savedAddressPage" />
      <Stack.Screen name="savedAddressMap" />
      <Stack.Screen name="savedAddressForm" />
    </Stack>
  );
}