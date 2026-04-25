// components/homeTabbar.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter, usePathname } from "expo-router";
import { styles } from "./style/homeTabbar.style";

type TabName = "home" | "shop" | "category" | "shorts";

const ICON_SIZE = 26.5;
const INACTIVE_COLOR = "#051c45";
const ACTIVE_COLORS: Record<TabName, string> = {
  home: "#262624",
  shop: "#1e7c3e",
  category: "#ff0099",
  shorts: "#148b34",
};

// ── Route map ────────────────────────────────────────────────────────────────
const ROUTE_MAP: Record<TabName, string> = {
  home: "/(home)/home",
  shop: "/(home)/shop",
  category: "/(home)/category",
  shorts: "/(home)/shorts",
};

// ── Segment map (for matching pathname) ──────────────────────────────────────
const SEGMENT_MAP: Record<TabName, string> = {
  home: "home",
  shop: "shop",
  category: "category",
  shorts: "shorts",
};

// ── Icons ────────────────────────────────────────────────────────────────────
type IconProps = { active: boolean; color: string };

const HomeIcon = ({ active, color }: IconProps) => (
  <Ionicons
    name={active ? "home" : "home-outline"}
    size={ICON_SIZE}
    color={active ? color : INACTIVE_COLOR}
  />
);

const ShopIcon = ({ active, color }: IconProps) => (
  <Ionicons
    name={active ? "bag" : "bag-outline"}
    size={ICON_SIZE}
    color={active ? color : INACTIVE_COLOR}
  />
);

const CategoryIcon = ({ active, color }: IconProps) => (
  <MaterialCommunityIcons
    name={active ? "view-grid-plus" : "view-grid-plus-outline"}
    size={ICON_SIZE}
    color={active ? color : INACTIVE_COLOR}
  />
);

const ShortsIcon = ({ active, color }: IconProps) => (
  <>
    <AntDesign
      name="play-square"
      size={ICON_SIZE}
      color={active ? color : INACTIVE_COLOR}
    />
  </>
);

// ── Tab config ────────────────────────────────────────────────────────────────
const TABS: { key: TabName; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "category", label: "Category" },
  { key: "shop", label: "Shop" },
  { key: "shorts", label: "Shorts" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function FooterTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  // Derive active tab from current pathname segment
  const activeTab = (Object.entries(SEGMENT_MAP).find(([, segment]) =>
    pathname.includes(segment),
  )?.[0] ?? "home") as TabName;

  const renderIcon = (key: TabName, active: boolean) => {
    const color = ACTIVE_COLORS[key];
    switch (key) {
      case "home":
        return <HomeIcon active={active} color={color} />;
      case "category":
        return <CategoryIcon active={active} color={color} />;
      case "shop":
        return <ShopIcon active={active} color={color} />;
      case "shorts":
        return <ShortsIcon active={active} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        {TABS.map(({ key, label }) => {
          const active = activeTab === key;
          return (
            <TouchableOpacity
              key={key}
              style={styles.tab}
              onPress={() => router.push(ROUTE_MAP[key] as any)}
              activeOpacity={0.7}
            >
              {renderIcon(key, active)}
              <Text style={[styles.label, active && styles.labelActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.homeIndicatorWrapper}>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}
