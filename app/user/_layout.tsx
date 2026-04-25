// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="userHome" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="helpAndSupport" />
      <Stack.Screen name="savedAddress" />
    </Stack>
  );
}