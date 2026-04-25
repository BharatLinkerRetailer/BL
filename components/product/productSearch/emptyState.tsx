// components/shop/product/EmptyState.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type EmptyStateProps = {
  filtered: boolean;
};

const BCK = "#F3F4F4";

export default function EmptyState({ filtered }: EmptyStateProps) {
  return (
    <View style={styles.emptyWrap}>
      <Ionicons
        name={filtered ? "funnel-outline" : "storefront-outline"}
        size={52}
        color="#C8CDD5"
      />
      <Text style={styles.emptyTitle}>
        {filtered ? "No matches found" : "No products yet"}
      </Text>
      <Text style={styles.emptySubtitle}>
        {filtered
          ? "Try adjusting your filters or sort order"
          : "This shop hasn't added any products yet"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    gap: 12,
    backgroundColor: BCK,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#8A8F98",
    textAlign: "center",
    paddingHorizontal: 40,
  },
});