import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../infoConstant";
import StatPill from "./statePill";
import ServiceBadge from "./serviceBadge";

export default function ShopInfoCard({ shop }: { shop: any }) {
  const shopName = shop?.shopName ?? "Shop";
  const rating = shop?.ratingAverage ?? 4.3;
  const ratingCount = shop?.ratingCount ?? 0;
  const isOpen = shop?.isOpen ?? true;

  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={[styles.openBadge, { backgroundColor: isOpen ? C.greenLight : "#FEE2E2" }]}>
          <View style={[styles.openDot, { backgroundColor: isOpen ? C.green : C.red }]} />
          <Text style={[styles.openText, { color: isOpen ? C.green : C.red }]}>
            {isOpen ? "Open Now" : "Closed"}
          </Text>
        </View>

        <View style={styles.ratingChip}>
          <Ionicons name="star" size={12} color={C.gold} />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          {ratingCount > 0 && <Text style={styles.ratingCount}>({ratingCount})</Text>}
        </View>
      </View>

      <Text style={styles.shopName}>{shopName}</Text>
      <Text style={styles.category}>
        {shop?.category ?? "Retail"} · {shop?.city ?? "Ranchi"}
      </Text>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <StatPill icon="time-outline" value="11 min" label="Delivery" color={C.navy} />
        <View style={styles.statDivider} />
        <StatPill icon="bag-handle-outline" value={String(shop?.totalOrders ?? "500+")} label="Orders" color={C.green} />
        <View style={styles.statDivider} />
        <StatPill icon="cube-outline" value={String(shop?.totalProducts ?? "200+")} label="Products" color="#7C3AED" />
      </View>

      <View style={styles.divider} />

      <View style={styles.serviceRow}>
        <ServiceBadge label="Delivery" icon="bicycle-outline" active={shop?.deliveryAvailable ?? true} />
        <ServiceBadge label="Pickup" icon="bag-outline" active={shop?.pickupAvailable ?? true} />
        <ServiceBadge label="Home Service" icon="home-outline" active={shop?.homeServiceAvailable ?? false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.white,
    marginHorizontal: 14,
    borderRadius: 20,
    padding: 18,
    zIndex: 2,
    shadowColor: "#b3b3b3",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth:0,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  openBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  openDot: { width: 6, height: 6, borderRadius: 3 },
  openText: { fontSize: 11, fontWeight: "700" },
  ratingChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFBEB",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  ratingText: { fontSize: 12, fontWeight: "800", color: "#92400E" },
  ratingCount: { fontSize: 11, color: C.muted },
  shopName: { fontSize: 26, fontWeight: "900", color: C.ink, letterSpacing: -0.5, lineHeight: 30 },
  category: { fontSize: 13, color: C.muted, marginTop: 4, fontWeight: "500" },
  divider: { height: 1, backgroundColor: C.border, marginVertical: 14 },
  statsRow: { flexDirection: "row", alignItems: "center" },
  statDivider: { width: 1, height: 36, backgroundColor: C.border, marginHorizontal: 8 },
  serviceRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
});