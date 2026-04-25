// components/shop/product/Toolbar.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NAVY = "#021526";
const ACCENT = "#E8B86D";

type ToolbarProps = {
  sortLabel: string;
  filterCount: number;
  onSortPress: () => void;
  onFilterPress: () => void;
};

export default function Toolbar({
  sortLabel,
  filterCount,
  onSortPress,
  onFilterPress,
}: ToolbarProps) {
  return (
    <View style={styles.toolbar}>
      <TouchableOpacity style={styles.toolbarBtn} onPress={onSortPress}>
        <Ionicons name="swap-vertical-outline" size={16} color="#000" />
        <Text style={styles.toolbarBtnText}>{sortLabel}</Text>
        <Ionicons name="chevron-down" size={14} color="rgba(0,0,0,0.6)" />
      </TouchableOpacity>

      <View style={styles.toolbarDivider} />

      <TouchableOpacity style={styles.toolbarBtn} onPress={onFilterPress}>
        <Ionicons name="funnel-outline" size={16} color="#000" />
        <Text style={styles.toolbarBtnText}>Filter</Text>

        {filterCount > 0 && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>{filterCount}</Text>
          </View>
        )}

        <Ionicons name="chevron-down" size={14} color="rgba(0,0,0,0.6)" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 8,
  },
  toolbarBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  toolbarBtnText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  toolbarDivider: {
    width: 1,
    height: 20,
    backgroundColor: "rgba(0,0,0,0.9)",
    marginHorizontal: 16,
  },
  filterBadge: {
    backgroundColor: ACCENT,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  filterBadgeText: {
    color: NAVY,
    fontSize: 12,
    fontWeight: "700",
  },
});