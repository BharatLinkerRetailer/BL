// components/product/productSearch/header.tsx
import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  autoFocus?: boolean;
}

export default function Header({
  searchQuery,
  onSearchChange,
  autoFocus = false,
}: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

 const handleBack = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/(home)/home");}
};

  return (
    <View style={[styles.header]}>
      <View style={styles.searchContainer}>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Pressable onPress={handleBack} hitSlop={12} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
        </Pressable>

          <TextInput
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Search products, brands..."
            style={styles.input}
            placeholderTextColor="#9CA3AF"
            returnKeyType="search"
            autoCapitalize="none"
            clearButtonMode="while-editing"
            autoFocus={autoFocus}
            selectTextOnFocus={true}
          />

          <MaterialIcons
            name="keyboard-voice"
            size={24}
            color="#6B7280"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F3F4F4",
    paddingHorizontal: 0,
    paddingBottom: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    paddingHorizontal: 16,
    height: 52,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1C1C1E",
  },
});