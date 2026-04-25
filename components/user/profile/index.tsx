import React, { useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, StatusBar, Alert } from "react-native";

import { ProfileHeader } from "./profileHeader";
import { FormField } from "./formField";
import { SubmitButton } from "./submitButton";
import { DeleteAccountSection } from "./deleteAccountSection";
import { useUserStore } from "../../../store/store";
import { useRouter } from "expo-router";

import auth from "@react-native-firebase/auth";

import { updateUserInfo } from "../../../firebase/user/user"; // adjust path

export const ProfileScreen: React.FC = () => {
  const { userData, setUserData } = useUserStore((state) => state);
  const router = useRouter();

  const [name, setName] = useState(userData?.name ?? "");
  const [mobile, setMobile] = useState(userData?.phoneNumber ?? "");
  const [email, setEmail] = useState(userData?.email ?? "");
  const [loading, setLoading] = useState(false);

  const handleBack = useCallback(() => {
    router.back();
    return true;
  }, []);

  const handleSubmit = async () => {
  setLoading(true);

  try {
    const user = auth().currentUser; // ✅ auth() not auth

    if (!user) {
      Alert.alert("Error", "User not logged in");
      return;
    }

    console.log(user);
    const updated = await updateUserInfo(user, name, email);

    if (updated) {
      setUserData(updated);
      Alert.alert("Success", "Profile updated successfully.");
    }
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Failed to update profile. Please try again.");
  } finally {
    setLoading(false);
  }
};



  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {} },
      ],
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ProfileHeader onBack={handleBack} />
      <View style={styles.body}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <FormField
            label="Name"
            value={name}
            onChangeText={setName}
            required
          />

          <FormField
            label="Mobile Number"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            required
            editable={false}
          />

          <FormField
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            required
            helperText="We promise not to spam you"
          />

          <SubmitButton onPress={handleSubmit} loading={loading} />
          <DeleteAccountSection onDelete={handleDeleteAccount} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 17,
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 48,
  },
});