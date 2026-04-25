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
import { shopHeaderStyle } from "./styles/shopHeader.styles";
import { useRouter, useFocusEffect, Href } from "expo-router";
import { Ionicons, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ Import cart store
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
      <View style={shopHeaderStyle.topHeader}>
        <View>
          <Text style={shopHeaderStyle.deliveryText}>Bharat | Linker</Text>

          <View style={shopHeaderStyle.row}>
            <Text style={shopHeaderStyle.time}>NearBy Shop</Text>
            <View style={shopHeaderStyle.badge}>
              <Text style={shopHeaderStyle.badgeText}>24/7</Text>
            </View>
          </View>

          <Pressable
            style={shopHeaderStyle.row}
            onPress={() => router.replace("/location?prevTab=shop" as Href)}
          >
            <Text style={shopHeaderStyle.address} numberOfLines={1}>
              {displayAddress}
            </Text>
            <EvilIcons name="chevron-down" size={24} color="white" />
          </Pressable>
        </View>

        <View style={shopHeaderStyle.iconRow}>
          {/* ✅ Cart Icon with Badge */}
          <TouchableOpacity
            style={shopHeaderStyle.cart}
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
            onPress={() => router.replace("/user/userHome?prevTab=shop" as Href)}
            style={shopHeaderStyle.userIcon}
          >
            <Ionicons name="person-outline" size={24} color="#000" />
          </Pressable>
        </View>
      </View>

      {/* Controlled search bar */}
      <View style={shopHeaderStyle.searchBar}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder='Search "laxmi store"'
          style={shopHeaderStyle.input}
          placeholderTextColor="grey"
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        <MaterialIcons name="keyboard-voice" size={22} color="gray" />
      </View>
    </>
  );
}

// ─── Badge Styles ───────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#ef4444",
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