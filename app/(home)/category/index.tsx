import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CategoryScreen from "../../../components/(home)/category/index";
import { useIsFocused } from "@react-navigation/native";

import { StatusBar } from "react-native";
export default function Category() {
  const isFocused = useIsFocused();
  return (
    <SafeAreaProvider>
          {isFocused && <StatusBar barStyle={"light-content"} />}
      <CategoryScreen />
    </SafeAreaProvider>
  );
}
