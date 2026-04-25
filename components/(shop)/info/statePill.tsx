import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../infoConstant";

type Props = {
  icon: string;
  value: string;
  label: string;
  color: string;
};

export default function StatPill({ icon, value, label, color }: Props) {
  return (
    <View style={styles.pill}>
      <View style={[styles.iconBox, { backgroundColor: color + "18" }]}>
        <Ionicons name={icon as any} size={16} color={color} />
      </View>
      <View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  value: { fontSize: 14, fontWeight: "800", color: C.ink },
  label: { fontSize: 10, color: C.muted, fontWeight: "500", marginTop: 1 },
});