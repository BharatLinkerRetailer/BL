// components/header/homeHeader.tsx   (or wherever this file is)
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Animated,
  Pressable,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useFocusEffect, Href } from "expo-router";
import { Ionicons, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useCart } from "../../../store/cart/cartStore";
import { homeHeaderStyle } from "./style/homeHeader.style";

interface Address {
  id: string;
  full: string;
  city: string | null;
  lat: number;
  lng: number;
}

interface Props {
  scrollY: Animated.Value;
  // searchQuery & onSearchChange removed → search bar is now dummy
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories = [
  "All",
  "Summer",
  "Ramzan",
  "Electronics",
  "Beauty",
  "Decor",
];

export default function Header({
  scrollY,
  selectedCategory,
  onCategorySelect,
}: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Cart badge
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
    }, [loadSelectedAddress]),
  );

  const displayAddress = selectedAddress?.full
    ? `Shop - ${
        selectedAddress.full.length > 30
          ? selectedAddress.full.slice(0, 30) + "..."
          : selectedAddress.full
      }`
    : "Shop - Set Location";

  useFocusEffect(
    useCallback(() => {
      router.prefetch("/product/productSearch" as Href); // ← Preloads the screen
    }, [router]),
  );
 // Instant navigation
  const handleSearchPress = () => {
    router.replace("/product/productSearch" as Href);     // ← replace instead of push
  };

  return (
    <>
      {/* Top Header */}
      <View style={homeHeaderStyle.topHeader}>
        <View>
          <Text style={homeHeaderStyle.deliveryText}>Bharat | Linker</Text>

          <View style={homeHeaderStyle.row}>
            <Text style={homeHeaderStyle.time}>11 Minutes</Text>
            <View style={homeHeaderStyle.badge}>
              <Text style={homeHeaderStyle.badgeText}>24/7</Text>
            </View>
          </View>

          <Pressable
            style={homeHeaderStyle.row}
            onPress={() => router.replace("/location?prevTab=shop" as Href)}
          >
            <Text style={homeHeaderStyle.address} numberOfLines={1}>
              {displayAddress}
            </Text>
            <EvilIcons name="chevron-down" size={24} color="white" />
          </Pressable>
        </View>

        <View style={homeHeaderStyle.iconRow}>
          {/* Cart Icon with Badge */}
          <TouchableOpacity
            style={homeHeaderStyle.cart}
            onPress={() => router.push("(cart)/cart" as Href)}
            activeOpacity={0.7}
          >
            <Ionicons name="cart-outline" size={24} color="black" />

            {totalItems > 0 && (
              <View style={cartStyles.cartBadge}>
                <Text style={cartStyles.badgeText}>
                  {totalItems > 99 ? "99+" : totalItems}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <Pressable
            onPress={() =>
              router.replace("/user/userHome?prevTab=shop" as Href)
            }
            style={homeHeaderStyle.userIcon}
          >
            <Ionicons name="person-outline" size={24} color="#000" />
          </Pressable>
        </View>
      </View>

      {/* ─── DUMMY SEARCH BAR (Tap to go to search page) ───────────────────── */}
      <Pressable
        style={homeHeaderStyle.searchBar}
        onPress={handleSearchPress}
        android_ripple={{ color: "rgba(0,0,0,0.1)" }}
      >
        <Ionicons name="search" size={20} color="gray" />

        <Text style={homeHeaderStyle.input} numberOfLines={1}>
          Search "laxmi store"
        </Text>

        <MaterialIcons name="keyboard-voice" size={22} color="gray" />
      </Pressable>

      {/* Category Scroll (unchanged) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={homeHeaderStyle.categoryScroll}
        contentContainerStyle={{ paddingHorizontal: 7 }}
      >
        {categories.map((item) => {
          const isSelected = selectedCategory === item;

          return (
            <TouchableOpacity
              key={item}
              style={homeHeaderStyle.categoryItem}
              onPress={() => onCategorySelect(item)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  homeHeaderStyle.categoryText,
                  isSelected && { fontWeight: "700" },
                ]}
              >
                {item}
              </Text>
              {isSelected && <View style={homeHeaderStyle.categoryIndicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
}

// Badge styles
const cartStyles = StyleSheet.create({
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
