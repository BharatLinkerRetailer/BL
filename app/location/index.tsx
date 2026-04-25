import React from "react";
import { View, BackHandler } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";

import LocationScreenPage from "../../components/mainLocationScreen/locationScreen";
export default function LocationScreen() {
  const router = useRouter();
  const { prevTab } = useLocalSearchParams<{ prevTab: string }>();

  const handleBack = useCallback(() => {
    if (prevTab) {
      router.navigate(`/(home)/${prevTab}` as any);
    } else {
      router.navigate(`/(home)/home` as any);
    }
    return true;
  }, [router, prevTab]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBack
      );
      return () => subscription.remove();
    }, [handleBack])
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <LocationScreenPage />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}