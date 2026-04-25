// ─── components/shop/shopHeader.tsx ──────────────────────────────────────────

import React, { useState, useCallback } from "react";
import { View, Text, TextInput, Animated, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useFocusEffect, Href } from "expo-router";
import { Ionicons, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { StyleSheet } from "react-native";

interface Address {
  id:   string;
  full: string;
  city: string | null;
  lat:  number;
  lng:  number;
}

interface Props {
  shopName:string | null,
  scrollY:        Animated.Value;
  searchQuery:    string;
  onSearchChange: (q: string) => void;
}

export default function Header({shopName, scrollY, searchQuery, onSearchChange }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
    useCallback(() => { loadSelectedAddress(); }, [loadSelectedAddress])
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
      <View style={headerStyle.topHeader}>
        <View>
          <Text style={headerStyle.deliveryText}>Bharat | Linker</Text>

          <View style={headerStyle.row}>
            <Text style={headerStyle.time}>{shopName}</Text>
            <View style={headerStyle.badge}>
              <Text style={headerStyle.badgeText}>24/7</Text>
            </View>
          </View>

          {/* <Pressable
            style={headerStyle.row}
            onPress={() => router.replace("/location?prevTab=shop" as Href)}
          >
            <Text style={headerStyle.address} numberOfLines={1}>
              {displayAddress}
            </Text>
            <EvilIcons name="chevron-down" size={24} color="white" />
          </Pressable> */}
        </View>
      </View>

      {/* Controlled search bar */}
      <View style={headerStyle.searchBar}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder='Search "laxmi store"'
          style={headerStyle.input}
          placeholderTextColor="grey"
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        <MaterialIcons name="keyboard-voice" size={22} color="gray" />
      </View>
    </>
  );
}






const headerStyle = StyleSheet.create({
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",

    color:"black"
  },

  deliveryText: {
    fontSize: 14,
    color:"black"
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  time: {
    fontSize: 26,
    fontWeight: "bold",
    marginRight: 8,
  },

  badge: {
    backgroundColor: "#000000",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },

  badgeText: {
    fontSize: 12,
    color:"white"
    },

  address: {
    marginTop: 3,
    fontSize: 13,
    color:"black"
  },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

    cart: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 8,
  },
  userIcon: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 8,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 12,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    color:"black",
    borderColor:"black",
    borderWidth:2
    
  },

  input: {
    flex: 1,
    marginLeft: 8,
    color:"grey",
    
  }
  ,

  categoryScroll: {
    marginTop: 12
  },

  categoryItem: {
    marginRight: 18,
    alignItems: "center",
  },

  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
