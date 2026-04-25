// components/shop/product/SortSheet.tsx
import React from "react";
import { Modal, View, Text, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NAVY = "#021526";

type SortOption = {
  label: string;
  value: "newest" | "price_asc" | "price_desc" | "popular";
};

const SORT_OPTIONS: SortOption[] = [
  { label: "Newest first", value: "newest" },
  { label: "Price: low → high", value: "price_asc" },
  { label: "Price: high → low", value: "price_desc" },
  { label: "Most popular", value: "popular" },
];

type SortSheetProps = {
  visible: boolean;
  current: SortOption["value"];
  onSelect: (value: SortOption["value"]) => void;
  onClose: () => void;
};

export default function SortSheet({ visible, current, onSelect, onClose }: SortSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>Sort by</Text>

        {SORT_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={styles.row}
            onPress={() => {
              onSelect(opt.value);
              onClose();
            }}
          >
            <Text style={[styles.rowText, current === opt.value && styles.rowActive]}>
              {opt.label}
            </Text>
            {current === opt.value && <Ionicons name="checkmark" size={20} color={NAVY} />}
          </TouchableOpacity>
        ))}
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
    paddingBottom: 20,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: "#DDE0E6",
    borderRadius: 2,
    alignSelf: "center",
    marginVertical: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#F0F1F3",
  },
  rowText: {
    fontSize: 15,
    color: "#333",
  },
  rowActive: {
    fontWeight: "700",
    color: NAVY,
  },
});