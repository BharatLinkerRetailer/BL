// ─── components/(home)/home/HomeCategoryGrid.tsx ────────────────────────────

import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Animated,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { HOME_CATEGORIES,HOME_CATEGORIES_CARD_GRADIENTS } from "../../../constants/homeData";
import { HomeCategory } from "../../../types/home/index";


// ─── Props ────────────────────────────────────────────────────────────────────
interface HomeCategoryGridProps {
  onCategoryPress: (cat: HomeCategory) => void;
  onSeeAllPress?: () => void;
  onBadgePress?: (badgeId: string) => void;
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function HomeCategoryGrid({
  onCategoryPress,
  onSeeAllPress,
  onBadgePress,
}: HomeCategoryGridProps): React.JSX.Element {
  return (
    <View style={styles.wrapper}>

      {/* ── Section header ── */}
      <SectionHeader onPress={onSeeAllPress ?? (() => {})} />

      {/* ── Horizontal quick-badge strip ── */}
      
      {/* ── Category grid ── */}
      <FlatList
        data={HOME_CATEGORIES}
        keyExtractor={(c) => c.id}
        numColumns={4}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item, index }) => (
          <CategoryCard
            cat={item}
            gradient={HOME_CATEGORIES_CARD_GRADIENTS[index % HOME_CATEGORIES_CARD_GRADIENTS.length]}
            onPress={() => onCategoryPress(item)}
          />
        )}
      />
    </View>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {/* Two-tone dot accent */}
        <LinearGradient
          colors={["#FF6B35", "#FF3B7A"]}
          style={styles.accentDot}
        />
        <Text style={styles.headerTitle}>Shop by Category</Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.seeAllPill}
      >
        <Text style={styles.seeAllText}>See all</Text>
        <Text style={styles.seeAllArrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Category Card ────────────────────────────────────────────────────────────
function CategoryCard({
  cat,
  gradient,
  onPress,
}: {
  cat: HomeCategory;
  gradient: readonly [string, string, string];
  onPress: () => void;
}) {
  const scale  = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();

  const handlePressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 28,
      bounciness: 12,
    }).start();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.card}
    >
      <Animated.View style={{ transform: [{ scale }], alignItems: "center" }}>

        {/* ── Icon shell with gradient + decorative rings ── */}
        <LinearGradient
          colors={gradient}
          start={{ x: 0.1, y: 0.0 }}
          end={{ x: 0.9, y: 1.0 }}
          style={styles.iconShell}
        >
          {/* Ring ornaments */}
          <View style={styles.ring1} />
          <View style={styles.ring2} />

          {/* Emoji */}
          <Text style={styles.icon}>{cat.icon}</Text>
        </LinearGradient>

        {/* Label */}
        <Text style={styles.label} numberOfLines={2}>
          {cat.label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
    marginHorizontal: 12,
    // backgroundColor: "#FFFFFF",
    // borderRadius: 26,
    paddingBottom: 18,
    // Outer glow shadow
    // shadowColor: "#9CA3AF",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.14,
    // shadowRadius: 18,
    // elevation: 5,
    // overflow: "hidden",
  },

  // ── Header ──
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 18,
    marginBottom: 15,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  accentDot: {
    width: 5,
    height: 17,
  },
  headerTitle: {
    fontSize: 15.5,
    fontWeight: "800",
    color: "#1C1C2E",
    letterSpacing: -0.4,
  },
  seeAllPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#FFF0EA",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 5,
  },
  seeAllText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#FF6B35",
  },
  seeAllArrow: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FF6B35",
    lineHeight: 17,
  },

  // ── Badge strip ──
  badgeStrip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 7,
  },
  badge: {
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.1,
  },

  // ── Grid ──
  grid: {
    paddingHorizontal: 14,
    paddingTop: 4,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 14,
  },

  // ── Card ──
  card: {
    flex: 1,
    maxWidth: "23%",
    alignItems: "center",
  },

  // ── Icon shell ──
  iconShell: {
    width: 62,
    height: 62,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
    overflow: "hidden",
    position: "relative",
    // Colored shadow via elevation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  ring1: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.3)",
    top: -18,
    right: -18,
  },
  ring2: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    bottom: -14,
    left: -12,
  },
  icon: {
    fontSize: 28,
    zIndex: 1,
  },

  // ── Label ──
  label: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#2D2D3A",
    textAlign: "center",
    lineHeight: 14.5,
    letterSpacing: 0.1,
    paddingHorizontal: 2,
  },
});