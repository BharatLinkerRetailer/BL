import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import IndexSearchProductScreen from "../../components/product/productSearch/indexProduct";
import { useIsFocused } from "@react-navigation/native";

import { StatusBar } from "react-native";
export default function ProductSearch() {
  const isFocused = useIsFocused();
  return (
    <SafeAreaProvider>
          {isFocused && <StatusBar barStyle={"dark-content"} />}
      <IndexSearchProductScreen/>
    </SafeAreaProvider>
  );
}
