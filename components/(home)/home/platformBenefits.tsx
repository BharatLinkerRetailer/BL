// components/(home)/home/PlatformBenefits.tsx
import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { PLATFORM_BENEFITS } from "../../../constants/homeData";
import type { PlatformBenefit } from "../../../types/home/index";

// ─── Utility: darken a hex color ─────────────────────────────────────────────
function darkenHex(hex: string, amount = 0.32): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (n >> 16) - Math.round(255 * amount));
  const g = Math.max(0, ((n >> 8) & 0xff) - Math.round(255 * amount));
  const b = Math.max(0, (n & 0xff) - Math.round(255 * amount));
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PlatformBenefits(): React.JSX.Element {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {PLATFORM_BENEFITS.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </ScrollView>
    </View>
  );
}

// ─── Benefit Card ─────────────────────────────────────────────────────────────
function BenefitCard({ benefit }: { benefit: PlatformBenefit }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scaleAnim, {
      toValue: 0.93,
      useNativeDriver: true,
      tension: 180,
      friction: 10,
    }).start();

  const onPressOut = () =>
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 120,
      friction: 8,
    }).start();

  const darkColor = darkenHex(benefit.color, 0.3);
  const midColor = darkenHex(benefit.color, 0.12);

  return (
    <Animated.View
      style={[
        styles.cardShadow,
        {
          shadowColor: benefit.color,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <LinearGradient
          colors={[darkColor, midColor, benefit.color]}
          start={{ x: 0.1, y: 0.0 }}
          end={{ x: 0.9, y: 1.0 }}
          style={styles.card}
        >
          {/* ── Decorative ring top-right ── */}
          <View style={[styles.ring1, { borderColor: "rgba(255,255,255,0.14)" }]} />
          <View style={[styles.ring2, { borderColor: "rgba(255,255,255,0.07)" }]} />

          {/* ── Bottom-left blob ── */}
          <View style={styles.blob} />

          {/* ── Icon Section ── */}
          <View style={styles.iconOuter}>
            <View style={styles.iconInner}>
              <Text style={styles.icon}>{benefit.icon}</Text>
            </View>
          </View>

          {/* ── Text ── */}
          <View style={styles.textBlock}>
            <Text style={styles.label} numberOfLines={2}>
              {benefit.label}
            </Text>
            <Text style={styles.desc} numberOfLines={3}>
              {benefit.desc}
            </Text>
          </View>

          {/* ── Bottom accent line ── */}
          <View style={styles.accentLine} />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const CARD_W = 148;
const CARD_H = 182;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 6,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },

  // Card shell with colored shadow
  cardShadow: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: 22,
  },
  card: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: 22,
    overflow: "hidden",
    padding: 16,
    justifyContent: "space-between",
  },

  // Decorative rings (top-right corner)
  ring1: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1.5,
    top: -32,
    right: -32,
  },
  ring2: {
    position: "absolute",
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 1,
    top: -8,
    right: -8,
  },

  // Bottom-left blob
  blob: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.08)",
    bottom: -20,
    left: -18,
  },

  // Icon circle
  iconOuter: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  iconInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 26,
  },

  // Text
  textBlock: {
    gap: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 19,
    letterSpacing: 0.1,
  },
  desc: {
    fontSize: 11.5,
    color: "rgba(255,255,255,0.68)",
    lineHeight: 16.5,
    fontWeight: "400",
  },

  // Bottom accent bar
  accentLine: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
});