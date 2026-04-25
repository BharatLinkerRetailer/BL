// components/shop/categoryPills.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NAVY = "#030101";
const ACCENT = "#E8B86D";

interface Props {
  sortLabel: string;      // e.g. "Top Rated", "Popular", "A → Z"
  filterCount: number;    // number of active filters (shows badge)
  onSortPress: () => void;
  onFilterPress: () => void;
}

export default function CategoryPills({
  sortLabel,
  filterCount,
  onSortPress,
  onFilterPress,
}: Props) {
  return (
    <View style={styles.toolbar}>
      {/* Sort Button */}
      <TouchableOpacity
        style={styles.toolbarBtn}
        onPress={onSortPress}
        activeOpacity={0.75}
      >
        <Ionicons name="swap-vertical-outline" size={18} color={NAVY} />
        <Text style={styles.toolbarBtnText}>{sortLabel? sortLabel:"Sort By"}</Text>
        <Ionicons
          name="chevron-down"
          size={16}
          color="rgb(0, 0, 0)"
        />
      </TouchableOpacity>

      <View style={styles.toolbarDivider} />

      {/* Filter Button */}
      <TouchableOpacity
        style={styles.toolbarBtn}
        onPress={onFilterPress}
        activeOpacity={0.75}
      >
        <Ionicons name="funnel-outline" size={18} color={NAVY} />

        <Text style={styles.toolbarBtnText}>Filter By</Text>

        {/* Filter count badge */}
        {filterCount > 0 && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>{filterCount}</Text>
          </View>
        )}

        <Ionicons
          name="chevron-down"
          size={16}
          color="rgb(0, 0, 0)"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBlockColor:"#21202029",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 9,
    marginBottom:11,
    borderRadius: 15,
  
  },

  toolbarBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  toolbarBtnText: {
    flex: 1,
    fontSize: 15.5,
    fontWeight: "600",
    color: NAVY,
    letterSpacing: -0.2,
  },

  toolbarDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 12,
  },

  filterBadge: {
    backgroundColor: ACCENT,
    borderRadius: 999,
    minWidth: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
    marginRight: 4,
  },

  filterBadgeText: {
    color: NAVY,
    fontSize: 12.5,
    fontWeight: "700",
  },
});