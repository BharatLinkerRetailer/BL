import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import IndexShopProduct from "../../../components/(shop)/product/indexProduct";

export default function Home() {
  const isFocused = useIsFocused();

  return (
    <>
      {isFocused && <StatusBar style="dark" />}
      <IndexShopProduct />
    </>
  );
}