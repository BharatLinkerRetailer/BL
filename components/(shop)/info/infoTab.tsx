import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { C } from "../infoConstant";
import { INFO_ROWS } from "../infoConstant";

export default function InfoTab({ shop }: { shop: any }) {
  return (
    <View style={styles.wrapper}>
      {shop?.description && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>
          <Text style={styles.desc}>{shop.description}</Text>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Store Details</Text>
        {INFO_ROWS.map((row) => (
          <View key={row.label} style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name={row.icon as any} size={16} color={C.navy} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowValue}>{row.value}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Methods</Text>
        <View style={styles.payRow}>
          {["UPI", "Card", "Cash", "Wallet"].map((p) => (
            <View key={p} style={styles.payChip}>
              <Text style={styles.payText}>{p}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Location</Text>
        <View style={styles.mapBox}>
          <MaterialCommunityIcons name="map-marker-radius" size={36} color={C.navy} />
          <Text style={styles.mapText}>View on Maps</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { padding: 16, gap: 14, paddingBottom: 100 },
  card: {
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 0.1,
    borderColor: C.border,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: C.navy,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  desc: { fontSize: 14, color: C.muted, lineHeight: 22 },
  row: { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 14 },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: { fontSize: 11, color: C.muted, fontWeight: "500" },
  rowValue: { fontSize: 13, color: C.ink, fontWeight: "600", marginTop: 1 },
  payRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  payChip: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  payText: { fontSize: 12, fontWeight: "600", color: C.ink },
  mapBox: {
    height: 100,
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    borderStyle: "dashed",
  },
  mapText: { fontSize: 13, fontWeight: "700", color: C.navy },
});