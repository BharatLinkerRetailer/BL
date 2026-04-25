import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// ─── add to components/shop/shopData.ts ──────────────────────────────────────

export interface Stat {
  label: string;
  value: string;
  icon:  string;
}

export const STATS: Stat[] = [
  { label: "Shops",    value: "500+",  icon: "storefront-outline"  },
  { label: "Orders",   value: "10K+",  icon: "bag-check-outline"   },
  { label: "Delivery", value: "30min", icon: "bicycle-outline"     },
];

import { shopStyles as styles } from "./styles/shop.style";

export default function StatsStrip() {
  return (
    <View style={styles.statsStrip}>
      {STATS.map((stat, index) => (
        <View key={stat.label} style={[styles.statItem, index === STATS.length - 1 && { borderRightWidth: 0 }]}>
          <Ionicons name={stat.icon as any} size={18} color="#FF6D00" />
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}