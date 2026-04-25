import React, { useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  BackHandler,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useFocusEffect, useLocalSearchParams } from "expo-router";

import { SettingsHeader } from "./userHeader";
import { ProfileCard } from "./profileCard";
import { QuickActionsRow } from "./quickActionRow";
import { UpdateBanner } from "./updateBanner";
import { MenuSection } from "./menuSection";
import { MenuItem } from "./menuItem";
import { useUserStore } from "../../../store/store";
import {useLogout} from "../../../hooks/logout"

export const UserHome: React.FC = () => {
  const userData = useUserStore((state) => state.userData);

  const { handleLogout } = useLogout();

  const router = useRouter();
  const { prevTab } = useLocalSearchParams<{ prevTab: string }>();

  const handleBack = useCallback(() => {
    console.log(prevTab)
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

  const navigate = (path: string) => router.push(path as any);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      <SettingsHeader onBack={handleBack} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard name={userData?.name ?? " "} phone={userData?.phoneNumber ?? " "} />

        <QuickActionsRow />
        <UpdateBanner onPress={() => {}} />

        <MenuSection title="Your Information">
          <MenuItem
            icon={<Feather name="user" size={22} color="#444" />}
            label="Profile"
            onPress={() => router.push("/user/profile")}
          />
          <MenuItem
            icon={
              <MaterialCommunityIcons
                name="message-text-outline"
                size={22}
                color="#444"
              />
            }
            label="Help & Support"
            onPress={() => router.push("/user/helpAndSupport")}
          />
          <MenuItem
            icon={<Feather name="map-pin" size={22} color="#444" />}
            label="Saved Addresses"
            subtitle="0 Addresses"
            onPress={() => navigate("/user/savedAddress")}
            showDivider={false}
          />
        </MenuSection>

        <MenuSection title="Other Information">
          <MenuItem
            icon={<Feather name="bell" size={22} color="#444" />}
            label="Notifications"
            onPress={() => navigate("/user/notifications")}
          />
          <MenuItem
            icon={<Feather name="info" size={22} color="#444" />}
            label="General Info"
            onPress={() => navigate("/user/generalInfo")}
            showDivider={false}
          />
        </MenuSection>

        <TouchableOpacity 
          onPress={handleLogout} style={styles.logoutButton} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>App version 26.3.1{"\n"}v138-5</Text>
      </ScrollView>
    </>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  logoutButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  version: {
    textAlign: "center",
    fontSize: 12,
    color: "#888888",
    lineHeight: 18,
  },
});
