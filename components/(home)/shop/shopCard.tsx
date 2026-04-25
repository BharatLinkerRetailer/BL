// ─── components/shop/shopCard.tsx ────────────────────────────────────────────

import React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ShopListItem } from "../../../types/shop/shop";

import { Href, useRouter } from "expo-router";
const { width } = Dimensions.get("window");

// Category → emoji fallback (no logoUrl)
const CATEGORY_EMOJI: Record<string, string> = {
  Grocery: "🛒",
  Pharmacy: "💊",
  Bakery: "🥐",
  Electronics: "📱",
  Fashion: "👗",
  Flowers: "💐",
  Restaurant: "🍽️",
  Service: "🔧",
};

// Category → avatar background
const CATEGORY_BG: Record<string, string> = {
  Grocery: "#cdff7e",
  Pharmacy: "#E3F2FD",
  Bakery: "#faff67",
  Electronics: "#c59eff",
  Fashion: "#FCE4EC",
  Flowers: "#F3E5F5",
  Restaurant: "#060606",
  Service: "#E0F2F1",
};

interface Props {
  item: ShopListItem;
  onPress?: (item: ShopListItem) => void;
}

export default function ShopCard({ item, onPress }: Props) {
  const router = useRouter();
  const isOpen = item.isOpen;
  const emoji = CATEGORY_EMOJI[item.category] ?? "🏪";
  const avatarBg = CATEGORY_BG[item.category] ?? "#F1F5F9";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        !isOpen && styles.cardClosed,
        pressed && styles.cardPressed,
      ]}
      onPress={() => isOpen && onPress?.(item)}
    >
      {/* ── TOP ROW ── */}
      <View style={styles.topRow}>
        {/* Avatar — logo if available, emoji fallback */}
        <View style={[styles.avatar, { backgroundColor: avatarBg }]}>
          {/* {item.logoUrl ? (
            <Image
              source={{ uri: item.logoUrl }}
              style={styles.logo}
              contentFit="cover"
            />
          ) : ( */}
          <Text style={styles.emoji}>{emoji}</Text>
          {/* )} */}
          {!isOpen && <View style={styles.avatarDimmer} />}
        </View>

        {/* Info block */}
        <View style={styles.infoBlock}>
          {/* Name + open/closed badge */}
          <View style={styles.nameRow}>
            <Text
              style={[styles.shopName, !isOpen && styles.textMuted]}
              numberOfLines={1}
            >
              {item.shopName}
            </Text>
            <View
              style={[
                styles.statusBadge,
                isOpen ? styles.badgeOpen : styles.badgeClosed,
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  isOpen ? styles.dotOpen : styles.dotClosed,
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  isOpen ? styles.statusTextOpen : styles.statusTextClosed,
                ]}
              >
                {isOpen ? "Open" : "Closed"}
              </Text>
            </View>
          </View>

          {/* Category + subCategory */}
          <View style={styles.catRow}>
            <Text style={styles.category}>{item.category}</Text>
            {item.subCategory && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.subCategory}</Text>
              </View>
            )}
          </View>

          {/* Rating + city */}
          <View style={styles.metaRow}>
            <Ionicons name="star" size={11} color="#F59E0B" />
            <Text style={styles.rating}>
              {item.ratingAverage?.toFixed(1) ?? "New"}
            </Text>
            {item.ratingCount !== undefined && (
              <Text style={styles.reviews}>({item.ratingCount})</Text>
            )}
            <View style={styles.divider} />
            <Ionicons name="location-outline" size={11} color="#94A3B8" />
            <Text style={styles.metaText}>{item.city}</Text>
          </View>
        </View>
      </View>

      {/* ── DIVIDER ── */}
      <View style={styles.separator} />

      {/* ── BOTTOM ROW ── */}
      <View style={styles.bottomRow}>
        {/* Service chips */}
        <View style={styles.deliveryInfo}>
          {item.deliveryAvailable ? (
            <>
              <Ionicons name="bicycle-outline" size={13} color="#64748B" />
              <Text style={styles.deliveryText}>Delivery</Text>
            </>
          ) : item.pickupAvailable ? (
            <>
              <Ionicons name="storefront-outline" size={13} color="#64748B" />
              <Text style={styles.deliveryText}>Pickup only</Text>
            </>
          ) : item.homeServiceAvailable ? (
            <>
              <Ionicons name="home-outline" size={13} color="#64748B" />
              <Text style={styles.deliveryText}>Home service</Text>
            </>
          ) : null}
        </View>
        {/* CTA */}
        {isOpen ? (
          <Pressable
            style={({ pressed }) => [
              styles.enterBtn,
              pressed && styles.enterBtnPressed,
            ]}
            onPress={() => {
              onPress?.(item);
              router.push(`/(shop)/info?shopId=${item.shopId}` as Href);
            }}
          >
            <Text style={styles.enterBtnText}>Enter Shop</Text>
            <Ionicons name="arrow-forward" size={13} color="#fff" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              onPress?.(item);
              router.push(`/(shop)/info?shopId=${item.shopId}` as Href);
            }}
          >
            <View style={styles.closedChip}>
              <Ionicons name="moon-outline" size={12} color="#94A3B8" />
              <Text style={styles.closedChipText}>Opens later</Text>
            </View>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  logo: {
    width: 64,
    height: 64,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 14,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: "#0607071f",
  },
  cardClosed: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    shadowOpacity: 0.03,
  },
  cardPressed: {
    opacity: 0.93,
    transform: [{ scale: 0.985 }],
  },

  // ── Top row
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 13,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarDimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.55)",
  },
  emoji: {
    fontSize: 28,
  },

  // Info block
  infoBlock: {
    flex: 1,
    gap: 5,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  shopName: {
    fontSize: 15.5,
    fontWeight: "700",
    color: "#0F172A",
    flex: 1,
    letterSpacing: -0.2,
  },
  textMuted: {
    color: "#94A3B8",
  },

  // Status badge
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeOpen: {
    backgroundColor: "#DCFCE7",
  },
  badgeClosed: {
    backgroundColor: "#FEE2E2",
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  dotOpen: { backgroundColor: "#16A34A" },
  dotClosed: { backgroundColor: "#DC2626" },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  statusTextOpen: { color: "#15803D" },
  statusTextClosed: { color: "#B91C1C" },

  // Category + tag
  catRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  category: {
    fontSize: 12.5,
    color: "#64748B",
    fontWeight: "500",
  },
  tag: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
  },

  // Meta row
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexWrap: "wrap",
  },
  rating: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
    marginLeft: 2,
  },
  reviews: {
    fontSize: 11.5,
    color: "#94A3B8",
  },
  divider: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 2,
  },
  metaText: {
    fontSize: 12,
    color: "#64748B",
    marginLeft: 2,
  },

  // Offer strip
  offerStrip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  offerText: {
    fontSize: 12,
    color: "#047857",
    fontWeight: "500",
    flex: 1,
  },

  // Separator
  separator: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginTop: 12,
    marginBottom: 12,
    marginHorizontal: -2,
  },

  // Bottom row
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  deliveryText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },

  // Enter Shop button
  enterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#1E293B",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
  },
  enterBtnPressed: {
    backgroundColor: "#334155",
    transform: [{ scale: 0.96 }],
  },
  enterBtnText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },

  // Closed chip
  closedChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 50,
  },
  closedChipText: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "500",
  },
});
