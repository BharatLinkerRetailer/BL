import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { C } from "../infoConstant";

export default function DeliveryTab() {
  return (
    <View style={styles.wrap}>
      <MaterialCommunityIcons name="shopping-outline" size={48} color={C.border} />
      <Text style={styles.title}>Products coming soon</Text>
      <Text style={styles.sub}>This shop hasn't added products yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 80, gap: 8 },
  title: { fontSize: 16, fontWeight: "700", color: C.ink },
  sub: { fontSize: 13, color: C.muted },
});