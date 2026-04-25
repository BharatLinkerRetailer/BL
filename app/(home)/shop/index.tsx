import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ShopScreen from "../../../components/(home)/shop/index";
import { useIsFocused } from "@react-navigation/native";

import { StatusBar } from "react-native";
export default function Shop() {
  const isFocused = useIsFocused();
  return (
    <SafeAreaProvider>
          {isFocused && <StatusBar barStyle={"light-content"} />}
      <ShopScreen />
    </SafeAreaProvider>
  );
}
