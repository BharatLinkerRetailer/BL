// components/product/KeyHighlights.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  /** e.g. { "Power Consumption": "1500 W", "Colour": "Black" } */
  highlights: Record<string, string>;
  defaultExpanded?: boolean;
}

export function KeyHighlights({ highlights, defaultExpanded = true }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const entries = Object.entries(highlights);

  return (
    <View style={styles.root}>
      {/* Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded((v) => !v)}
        activeOpacity={0.7}
      >
        <Text style={styles.headerText}>Key Highlights</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#424242"
        />
      </TouchableOpacity>

      <View style={styles.headerDivider} />

      {/* 2-column Grid */}
      {expanded && (
        <View style={styles.grid}>
          {entries.map(([label, value], i) => {
            const isLastOdd = i === entries.length - 1 && entries.length % 2 !== 0;
            return (
              <View
                key={label}
                style={[
                  styles.cell,
                  // Full-width if it's the lone last item
                  isLastOdd && styles.cellFull,
                  // Bottom border for all except last row
                  i < entries.length - (isLastOdd ? 1 : 2) && styles.cellBorder,
                  // Right border for left column cells
                  !isLastOdd && i % 2 === 0 && styles.cellRightBorder,
                ]}
              >
                <Text style={styles.cellLabel}>{label}</Text>
                <Text style={styles.cellValue}>{value}</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
    marginTop: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#212121",
  },
  headerDivider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginHorizontal: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 4,
    paddingBottom: 8,
  },
  cell: {
    width: "50%",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cellFull: {
    width: "100%",
  },
  cellBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  cellRightBorder: {
    borderRightWidth: 1,
    borderRightColor: "#F0F0F0",
  },
  cellLabel: {
    fontSize: 12,
    color: "#9E9E9E",
    fontWeight: "500",
    marginBottom: 4,
  },
  cellValue: {
    fontSize: 14.5,
    color: "#212121",
    fontWeight: "600",
  },
});