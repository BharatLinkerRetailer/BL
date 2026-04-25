import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import MapScreenPage from "../../components/mainLocationScreen/mapScreenPage";


export default function MapScreen() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <MapScreenPage  />
    </SafeAreaProvider>
  );
}