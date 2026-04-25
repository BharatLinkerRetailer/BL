import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {IndexPhoneLogin} from "../../components/auth/indexPhoneLogin"

export default function LocationScreen() {

  return (
    <SafeAreaProvider>
        <IndexPhoneLogin/>
    </SafeAreaProvider>
  );
}