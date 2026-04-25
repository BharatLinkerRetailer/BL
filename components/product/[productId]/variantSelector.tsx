// components/product/VariantSelector.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import type { Variant } from "../../../types/product/product";

interface Props {
  variants: Variant[];
  selectedId: string | null;
  onSelect: (variant: Variant) => void;
}

function variantLabel(v: Variant): string {
  return Object.values(v.attributes).join(" · ");
}

export function VariantSelector({ variants, selectedId, onSelect }: Props) {
  if (variants.length <= 1) return null;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Variant</Text>
      <FlatList
        data={variants}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyExtractor={(v) => v.id}
        renderItem={({ item: v }) => {
          const isActive = v.id === selectedId;
          const isUnavailable =
            v.status === "out_of_stock" || v.status === "discontinued";

          return (
            <TouchableOpacity
              style={[
                styles.chip,
                isActive && styles.chipActive,
                isUnavailable && styles.chipUnavailable,
              ]}
              onPress={() => onSelect(v)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.chipText,
                  isActive && styles.chipTextActive,
                  isUnavailable && styles.chipTextUnavailable,
                ]}
              >
                {variantLabel(v)}
              </Text>

              {/* Out-of-stock slash line */}
              {isUnavailable && <View style={styles.slashLine} />}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 28,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#888",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  list: {
    gap: 10,
    paddingRight: 20,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  chipActive: {
    borderColor: "#0A7A1C",
    backgroundColor: "#F0FAF1",
  },
  chipUnavailable: {
    borderColor: "#E5E7EB",
    backgroundColor: "#F9F9F9",
    opacity: 0.6,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3D3D3D",
  },
  chipTextActive: {
    color: "#0A7A1C",
  },
  chipTextUnavailable: {
    color: "#ABABAB",
  },
  slashLine: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: "#C0C0C0",
    transform: [{ rotate: "-8deg" }],
  },
});