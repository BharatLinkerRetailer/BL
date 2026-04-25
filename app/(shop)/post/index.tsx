import React, { useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import IndexShopPostScreen from "../../../components/(shop)/post/indexPost";

import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
export default function Home() {
  const isFocused = useIsFocused();

  return (
    <>
      {isFocused && <StatusBar style="dark" />}
      <SafeAreaProvider>
        <IndexShopPostScreen />
      </SafeAreaProvider>
    </>
  );
}
