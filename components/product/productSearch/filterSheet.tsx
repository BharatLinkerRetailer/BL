// components/shop/product/FilterSheet.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NAVY = "#021526";

type ActiveFilter = {
  categories: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
};

type FilterSheetProps = {
  visible: boolean;
  categories: string[];
  filters: ActiveFilter;
  onChange: (filters: ActiveFilter) => void;
  onApply: () => void;
  onClose: () => void;
  onClear: () => void;
};

export default function FilterSheet({
  visible,
  categories,
  filters,
  onChange,
  onApply,
  onClose,
  onClear,
}: FilterSheetProps) {
  const toggleCategory = (cat: string) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />

        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={onClear}>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Category */}
          {categories.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Category</Text>
              <View style={styles.chipContainer}>
                {categories.map((cat) => {
                  const active = filters.categories.includes(cat);
                  return (
                    <TouchableOpacity
                      key={cat}
                      style={[styles.chip, active && styles.chipActive]}
                      onPress={() => toggleCategory(cat)}
                    >
                      <Text style={[styles.chipText, active && styles.chipTextActive]}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* In stock only */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Availability</Text>
            <TouchableOpacity
              style={styles.row}
              onPress={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
            >
              <Text style={styles.rowText}>In stock only</Text>
              <View style={[styles.checkbox, filters.inStockOnly && styles.checkboxActive]}>
                {filters.inStockOnly && <Ionicons name="checkmark" size={14} color="#fff" />}
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.applyButton} onPress={onApply}>
          <Text style={styles.applyText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 24,
    maxHeight: "78%",
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: "#DDE0E6",
    borderRadius: 2,
    alignSelf: "center",
    marginVertical: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 17, fontWeight: "700" },
  clearText: { color: "#E05C5C", fontWeight: "500" },
  section: { marginBottom: 24 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#8A8F98",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#DDE0E6",
  },
  chipActive: {
    backgroundColor: NAVY,
    borderColor: NAVY,
  },
  chipText: { fontSize: 14, color: "#555" },
  chipTextActive: { color: "#fff", fontWeight: "600" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  rowText: { fontSize: 15, color: "#333" },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#DDE0E6",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: NAVY,
    borderColor: NAVY,
  },
  applyButton: {
    backgroundColor: NAVY,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
  },
  applyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});