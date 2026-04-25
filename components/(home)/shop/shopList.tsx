// ─── components/shop/shopList.tsx ────────────────────────────────────────────

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Animated,
} from "react-native";
import ShopCard from "./shopCard";
import { ShopListItem } from "../../../types/shop/shop";

interface Props {
  shops: ShopListItem[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onShopPress: (item: ShopListItem) => void;
}

// ─── Empty state ─────────────────────────────────────────────────────────────
function EmptyState() {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
    ]).start();

    // Gentle pulse on the rings
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 1800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,    duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.empty,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {/* Icon cluster */}
      <View style={styles.iconWrapper}>
        {/* Outer pulsing ring */}
        <Animated.View
          style={[styles.ring, styles.ringOuter, { transform: [{ scale: pulseAnim }] }]}
        />
        {/* Middle ring */}
        <View style={[styles.ring, styles.ringMiddle]} />
        {/* Inner solid disc */}
        <View style={styles.iconDisc}>
          <Text style={styles.iconGlyph}>🔍</Text>
        </View>
      </View>

      {/* Copy */}
      <View style={styles.copyBlock}>
        <Text style={styles.emptyTitle}>Nothing here yet</Text>
        <Text style={styles.emptySubtitle}>
          We couldn't find any shops matching your search.{"\n"}Try a different keyword or category.
        </Text>
      </View>

    </Animated.View>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ShopList({
  shops, loading, loadingMore, hasMore, onLoadMore, onShopPress,
}: Props) {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0F172A" />
      </View>
    );
  }

  if (shops.length === 0) {
    return <EmptyState />;
  }

  return (
    <View style={styles.container}>
      {shops.map((shop) => (
        <ShopCard
          key={shop.shopId}
          item={shop}
          onPress={() => onShopPress(shop)}
        />
      ))}

      {hasMore && (
        <Pressable
          onPress={onLoadMore}
          disabled={loadingMore}
          style={({ pressed }) => [
            styles.loadMoreBtn,
            pressed && styles.loadMoreBtnPressed,
            loadingMore && styles.loadMoreBtnDisabled,
          ]}
        >
          {loadingMore ? (
            <ActivityIndicator size="small" color="#0F172A" />
          ) : (
            <Text style={styles.loadMoreText}>Load more shops</Text>
          )}
        </Pressable>
      )}

      <View style={styles.footer} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const DISC = 72;
const RING_MID = DISC + 28;
const RING_OUT = DISC + 60;

const styles = StyleSheet.create({
  container: { paddingTop: 12 },

  // ── Loading ──────────────────────────────────────────────────────────────
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },

  // ── Empty ────────────────────────────────────────────────────────────────
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 72,
    paddingHorizontal: 32,
    gap: 28,
  },

  // Icon rings
  iconWrapper: {
    width: RING_OUT,
    height: RING_OUT,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 1,
  },
  ringOuter: {
    width: RING_OUT,
    height: RING_OUT,
    borderColor: "#E2E8F0",
    backgroundColor: "transparent",
  },
  ringMiddle: {
    width: RING_MID,
    height: RING_MID,
    borderColor: "#CBD5E1",
    backgroundColor: "transparent",
  },
  iconDisc: {
    width: DISC,
    height: DISC,
    borderRadius: DISC / 2,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#94A3B8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  iconGlyph: {
    fontSize: 30,
  },

  // Copy block
  copyBlock: {
    alignItems: "center",
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.4,
  },
  emptySubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: "#94A3B8",
    textAlign: "center",
  },

  // Suggestion tags
  tagRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748B",
  },

  // ── Load more ─────────────────────────────────────────────────────────────
  loadMoreBtn: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  loadMoreBtnPressed:  { backgroundColor: "#F8FAFC" },
  loadMoreBtnDisabled: { opacity: 0.6 },
  loadMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: { height: 100 },
});