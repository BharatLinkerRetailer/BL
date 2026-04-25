import React, { useEffect, useState } from "react";
import PhoneLoginScreen  from "./phoneLogin";
import { SuccessScreen } from "./successScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import auth from "@react-native-firebase/auth";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export const IndexPhoneLogin: React.FC = (): React.ReactElement => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    console.log("Login-Screen");
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setFirebaseUser(user);
    });
    return unsubscribe;
  }, []);

  const isLoggedIn = !!firebaseUser;
  const bgColor = isLoggedIn ? "#ffffff" : "#d4f5e8";

  return (
    <>
      <StatusBar
        style={isLoggedIn ? "light" : "dark"}
        backgroundColor={isLoggedIn ? "#0a0f1e" : bgColor}
        translucent={false}
      />

      {isLoggedIn ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0a0f1e" }}>
          <SuccessScreen />
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
          <PhoneLoginScreen />
        </SafeAreaView>
      )}
    </>
  );
};

export default IndexPhoneLogin;