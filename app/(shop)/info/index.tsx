import React from "react";

import { StatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {useEffect, useCallback } from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import IndexShopInfo from "../../../components/(shop)/info/indexInfo";


export default function Home() {
   
  return (
    <>
      <SafeAreaProvider>
        <IndexShopInfo/>
      </SafeAreaProvider>
    </>
  );
}
