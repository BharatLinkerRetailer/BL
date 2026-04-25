// ─── components/shop/shopHeader.tsx ──────────────────────────────────────────

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Animated,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { categoryHeaderStyle } from "./style/categoryHeader.style";
import { useRouter, useFocusEffect, Href } from "expo-router";
import { Ionicons, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ Import your cart store
import { useCart } from "../../../store/cart/cartStore";

interface Address {
  id: string;
  full: string;
  city: string | null;
  lat: number;
  lng: number;
}

interface Props {
  scrollY: Animated.Value;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function Header({ scrollY, searchQuery, onSearchChange }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // ✅ Get total cart items
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const loadSelectedAddress = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem("selected_address");
      setSelectedAddress(data ? JSON.parse(data) : null);
    } catch (e) {
      console.log("Error loading address:", e);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSelectedAddress();
    }, [loadSelectedAddress])
  );

  const displayAddress = selectedAddress?.full
    ? `Shop - ${
        selectedAddress.full.length > 30
          ? selectedAddress.full.slice(0, 30) + "..."
          : selectedAddress.full
      }`
    : "Shop - Set Location";

  return (
    <>
      <View style={categoryHeaderStyle.topHeader}>
        <View>
          <Text style={categoryHeaderStyle.deliveryText}>Bharat | Linker</Text>

          <View style={categoryHeaderStyle.row}>
            <Text style={categoryHeaderStyle.time}>Categories</Text>
            <View style={categoryHeaderStyle.badge}>
              <Text style={categoryHeaderStyle.badgeText}>24/7</Text>
            </View>
          </View>

          <Pressable
            style={categoryHeaderStyle.row}
            onPress={() => router.replace("/location?prevTab=shop" as Href)}
          >
            <Text style={categoryHeaderStyle.address} numberOfLines={1}>
              {displayAddress}
            </Text>
            <EvilIcons name="chevron-down" size={24} color="white" />
          </Pressable>
        </View>

        <View style={categoryHeaderStyle.iconRow}>
          {/* ✅ Cart Icon with Badge */}
          <TouchableOpacity
            style={categoryHeaderStyle.cart}
            onPress={() => router.push("/cart" as Href)}
            activeOpacity={0.7}
          >
            <Ionicons name="cart-outline" size={24} color="black" />

            {/* Cart Badge */}
            {totalItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.badgeText}>
                  {totalItems > 99 ? "99+" : totalItems}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <Pressable
            onPress={() => router.replace("/user/userHome?prevTab=category" as Href)}
            style={categoryHeaderStyle.userIcon}
          >
            <Ionicons name="person-outline" size={24} color="#000" />
          </Pressable>
        </View>
      </View>

      {/* Controlled search bar (commented as per your code) */}
      {/* <View style={categoryHeaderStyle.searchBar}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder='Search "laxmi store"'
          style={categoryHeaderStyle.input}
          placeholderTextColor="grey"
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        <MaterialIcons name="keyboard-voice" size={22} color="gray" />
      </View> */}
    </>
  );
}

// ─── Badge Styles ───────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#ef4444", // red
    borderRadius: 999,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: "#ffffff",
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
  },
});