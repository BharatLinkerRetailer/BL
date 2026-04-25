// components/shop/FilterSheet.tsx
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

import {
  ShopFilters,
  ShopCategory,        // ← Added for type safety
} from "../../../types/shop/shop";

const NAVY = "#021526";

// Official categories from your ShopCategory type (kept in sync)
const FILTER_CATEGORIES: ShopCategory[] = [
  "Grocery",
  "Pharmacy",
  "Bakery",
  "Electronics",
  "Fashion",
  "Flowers",
  "Restaurant",
  "Service",
];

type FilterSheetProps = {
  visible: boolean;
  filters: ShopFilters;
  onChange: (filters: ShopFilters) => void;
  onApply: () => void;
  onClose: () => void;
  onClear: () => void;
};

export default function FilterSheet({
  visible,
  filters,
  onChange,
  onApply,
  onClose,
  onClear,
}: FilterSheetProps) {
  // Safe access (categories can be undefined per ShopFilters type)
  const categories = filters.categories ?? [];

  const toggleCategory = (cat: ShopCategory) => {
    const nextCategories = categories.includes(cat)
      ? categories.filter((c) => c !== cat)
      : [...categories, cat];

    onChange({ ...filters, categories: nextCategories });
  };

  const toggleBoolean = (key: keyof ShopFilters) => {
    const current = (filters as any)[key] ?? false;
    onChange({ ...filters, [key]: !current } as ShopFilters);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={styles.sheet}>
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={onClear} hitSlop={10}>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Category Section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Categories</Text>
            <View style={styles.chipContainer}>
              {FILTER_CATEGORIES.map((cat) => {
                const isActive = categories.includes(cat);
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.chip, isActive && styles.chipActive]}
                    onPress={() => toggleCategory(cat)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[styles.chipText, isActive && styles.chipTextActive]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Availability Section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Availability</Text>

            <TouchableOpacity
              style={styles.row}
              onPress={() => toggleBoolean("isOpen")}
              activeOpacity={0.75}
            >
              <Text style={styles.rowText}>Open Now</Text>
              <View
                style={[
                  styles.checkbox,
                  filters.isOpen && styles.checkboxActive,
                ]}
              >
                {filters.isOpen && <Ionicons name="checkmark" size={18} color="#fff" />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.row}
              onPress={() => toggleBoolean("deliveryAvailable")}
              activeOpacity={0.75}
            >
              <Text style={styles.rowText}>Delivery Available</Text>
              <View
                style={[
                  styles.checkbox,
                  filters.deliveryAvailable && styles.checkboxActive,
                ]}
              >
                {filters.deliveryAvailable && (
                  <Ionicons name="checkmark" size={18} color="#fff" />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.row}
              onPress={() => toggleBoolean("homeServiceAvailable")}
              activeOpacity={0.75}
            >
              <Text style={styles.rowText}>Home Service Available</Text>
              <View
                style={[
                  styles.checkbox,
                  filters.homeServiceAvailable && styles.checkboxActive,
                ]}
              >
                {filters.homeServiceAvailable && (
                  <Ionicons name="checkmark" size={18} color="#fff" />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.row}
              onPress={() => toggleBoolean("pickupAvailable")}
              activeOpacity={0.75}
            >
              <Text style={styles.rowText}>Pickup Available</Text>
              <View
                style={[
                  styles.checkbox,
                  filters.pickupAvailable && styles.checkboxActive,
                ]}
              >
                {filters.pickupAvailable && (
                  <Ionicons name="checkmark" size={18} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Apply Button */}
        <TouchableOpacity style={styles.applyButton} onPress={onApply} activeOpacity={0.85}>
          <Text style={styles.applyText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 24,
    maxHeight: "85%",
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#CBD5E1",
    alignSelf: "center",
    marginVertical: 12,
    borderRadius: 999,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: NAVY,
  },
  clearText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748B",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#F1F5F9",
    borderRadius: 999,
  },
  chipActive: {
    backgroundColor: NAVY,
  },
  chipText: {
    fontSize: 14.5,
    fontWeight: "600",
    color: "#334155",
  },
  chipTextActive: {
    color: "#fff",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  priceInputContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 6,
  },
  priceInput: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#0F172A",
  },
  priceDivider: {
    fontSize: 22,
    color: "#94A3B8",
    marginTop: 22,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  rowText: {
    fontSize: 16,
    color: "#334155",
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: NAVY,
    borderColor: NAVY,
  },
  applyButton: {
    backgroundColor: NAVY,
    height: 56,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  applyText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
});