// components/(shop)/shopTabbar.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter, usePathname } from "expo-router";

type TabName = "info" | "product" | "post";

const ICON_SIZE = 26;
const INACTIVE_COLOR = "#9CA3AF";

const ACTIVE_COLORS: Record<TabName, string> = {
  info: "#262624",
  product: "#1e7c3e",
  post: "#f51899",
};

// ── Segment map (for matching pathname) ───────────────────────────────────────
const SEGMENT_MAP: Record<TabName, string> = {
  info: "info",
  product: "product",
  post: "post",
};

// ── Icons ─────────────────────────────────────────────────────────────────────
type IconProps = { active: boolean; color: string };

const HomeIcon = ({ active, color }: IconProps) => (
  <Ionicons
    name={active ? "home" : "home-outline"}
    size={ICON_SIZE}
    color={active ? color : INACTIVE_COLOR}
  />
);

// FIX: product tab uses the bag/shop icon
const ShopIcon = ({ active, color }: IconProps) => (
  <Ionicons
    name={active ? "bag" : "bag-outline"}
    size={ICON_SIZE}
    color={active ? color : INACTIVE_COLOR}
  />
);

// FIX: post tab uses a tag/pricetag icon — much more semantic
const PostIcon = ({ active, color }: IconProps) => (
  <Ionicons
    name={active ? "pricetag" : "pricetag-outline"}
    size={ICON_SIZE}
    color={active ? color : INACTIVE_COLOR}
  />
);

// ── Tab config ────────────────────────────────────────────────────────────────
const TABS: { key: TabName; label: string }[] = [
  { key: "info", label: "Info" },
  { key: "product", label: "Products" },
  { key: "post", label: "posts" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function FooterTabBar() {
  const { shopId } = useLocalSearchParams<{ shopId: string }>();
  const router = useRouter();
  const pathname = usePathname();

  // ── Route map ─────────────────────────────────────────────────────────────────
  const ROUTE_MAP: Record<TabName, string> = {
    info: `/(shop)/info?shopId=${shopId}`,
    product: `/(shop)/product?shopId=${shopId}`,
    post: `/(shop)/post?shopId=${shopId}`,
  };

  // FIX: default fallback is "info" (a valid TabName), not "home"
  const activeTab = (Object.entries(SEGMENT_MAP).find(([, segment]) =>
    pathname.includes(segment),
  )?.[0] ?? "info") as TabName;

  const renderIcon = (key: TabName, active: boolean) => {
    const color = ACTIVE_COLORS[key];
    // FIX: correct icon mapping for every tab
    switch (key) {
      case "info":
        return <HomeIcon active={active} color={color} />;
      case "product":
        return <ShopIcon active={active} color={color} />;
      case "post":
        return <PostIcon active={active} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        {TABS.map(({ key, label }) => {
          const active = activeTab === key;
          const activeColor = ACTIVE_COLORS[key];
          return (
            <TouchableOpacity
              key={key}
              style={styles.tab}
              onPress={() => router.push(ROUTE_MAP[key] as any)}
              activeOpacity={0.7}
            >
              {/* Active indicator dot above icon */}
              <View
                style={[styles.dot, active && { backgroundColor: activeColor }]}
              />
              {renderIcon(key, active)}
              <Text
                style={[
                  styles.label,
                  active && { ...styles.labelActive, color: activeColor },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* iOS home indicator pill */}
      <View style={styles.homeIndicatorWrapper}>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 8,
    paddingBottom: 4,
    // Subtle shadow on iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 8, // Android
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    gap: 3,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "transparent",
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: "400",
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 2,
  },
  labelActive: {
    fontWeight: "700",
  },
  homeIndicatorWrapper: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 4,
  },
  homeIndicator: {
    width: 120,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#E5E7EB",
  },
});
