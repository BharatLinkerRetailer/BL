// components/shop/SortSheet.tsx
import React from "react";
import { Modal, View, Text, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SortOption, SortDirection } from "../../../types/shop/shop";

const NAVY = "#021526";

const SORT_OPTIONS: { label: string; by: SortOption; dir: SortDirection }[] = [
  { label: "Top Rated", by: "ratingAverage", dir: "desc" },
  { label: "Popular", by: "totalOrders", dir: "desc" },
  { label: "A → Z", by: "shopName", dir: "asc" },
];

type Props = {
  visible: boolean;
  current: SortOption;
  onSelect: (by: SortOption, dir?: SortDirection) => void;
  onClose: () => void;
};

export default function SortSheet({ visible, current, onSelect, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>Sort by</Text>

        {SORT_OPTIONS.map((opt) => {
          const isActive = opt.by === current;
          return (
            <TouchableOpacity
              key={opt.by}
              style={styles.row}
              onPress={() => {
                onSelect(opt.by, opt.dir);
                onClose();
              }}
            >
              <Text style={[styles.rowText, isActive && styles.rowActive]}>
                {opt.label}
              </Text>
              {isActive && <Ionicons name="checkmark" size={20} color={NAVY} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#CBD5E1",
    alignSelf: "center",
    marginVertical: 12,
    borderRadius: 999,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: NAVY,
    textAlign: "center",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  rowText: { fontSize: 16, color: "#334155" },
  rowActive: { fontWeight: "700", color: NAVY },
});
