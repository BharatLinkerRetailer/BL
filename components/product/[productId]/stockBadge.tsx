// components/product/StockBadge.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { VariantStatus } from "../../../types/product/product";

interface Props {
  status: VariantStatus;
  /** Optional quantity to show "Only X left" warning */
  quantity?: number;
  lowStockThreshold?: number;
}

export function StockBadge({ status, quantity, lowStockThreshold = 5 }: Props) {
  const isUnavailable =
    status === "out_of_stock" || status === "discontinued";

  const isLowStock =
    !isUnavailable &&
    quantity !== undefined &&
    quantity > 0 &&
    quantity <= lowStockThreshold;

  if (isUnavailable) {
    return (
      <View style={[styles.badge, styles.badgeRed]}>
        <Ionicons name="close-circle-outline" size={15} color="#C62828" />
        <Text style={[styles.badgeText, styles.badgeTextRed]}>
          {status === "discontinued" ? "Discontinued" : "Out of Stock"}
        </Text>
      </View>
    );
  }

  if (isLowStock) {
    return (
      <View style={[styles.badge, styles.badgeAmber]}>
        <Ionicons name="alert-circle-outline" size={15} color="#E65100" />
        <Text style={[styles.badgeText, styles.badgeTextAmber]}>
          Only {quantity} left
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.badge, styles.badgeGreen]}>
      <Ionicons name="checkmark-circle-outline" size={15} color="#1B5E20" />
      <Text style={[styles.badgeText, styles.badgeTextGreen]}>
        In Stock · Ready to ship
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    marginTop: 20,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.1,
  },

  badgeGreen: { backgroundColor: "#F0FAF1", borderWidth: 1, borderColor: "#C8E6C9" },
  badgeTextGreen: { color: "#1B5E20" },

  badgeAmber: { backgroundColor: "#FFF8F0", borderWidth: 1, borderColor: "#FFE0B2" },
  badgeTextAmber: { color: "#E65100" },

  badgeRed: { backgroundColor: "#FFF5F5", borderWidth: 1, borderColor: "#FFCDD2" },
  badgeTextRed: { color: "#C62828" },
});