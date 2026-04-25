import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CartScreen from "../../../components/(cart)/cart/index";
import { useIsFocused } from "@react-navigation/native";

import { StatusBar } from "react-native";
export default function Cart() {
  const isFocused = useIsFocused();
  return (
    <SafeAreaProvider>
          {isFocused && <StatusBar barStyle={"light-content"} />}
      <CartScreen />
    </SafeAreaProvider>
  );
}
