import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "../../../components/(home)/home/index";
import { useIsFocused } from "@react-navigation/native";

import { StatusBar } from "react-native";
export default function Home() {
  const isFocused = useIsFocused();
  return (
    <SafeAreaProvider>
          {isFocused && <StatusBar barStyle={"light-content"} />}
      <HomeScreen />
    </SafeAreaProvider>
  );
}
