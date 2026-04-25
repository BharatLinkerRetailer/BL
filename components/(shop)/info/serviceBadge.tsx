import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../infoConstant";

type Props = {
  label: string;
  icon: string;
  active: boolean;
};

export default function ServiceBadge({ label, icon, active }: Props) {
  return (
    <View style={[styles.badge, active ? styles.active : styles.inactive]}>
      <Ionicons name={icon as any} size={12} color={active ? C.green : C.muted} />
      <Text style={[styles.text, { color: active ? C.green : C.muted }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
  },
  active: { backgroundColor: C.greenLight, borderColor: "#6ee7b7" },
  inactive: { backgroundColor: "#F3F4F6", borderColor: C.border },
  text: { fontSize: 11, fontWeight: "600" },
});