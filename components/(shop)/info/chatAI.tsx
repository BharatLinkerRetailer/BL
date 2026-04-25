import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../infoConstant";

export default function ChatAITab() {
  return (
    <View style={styles.wrap}>
      <Ionicons name="pricetag-outline" size={48} color={C.border} />
      <Text style={styles.title}>No offers right now</Text>
      <Text style={styles.sub}>Check back later for deals</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 80, gap: 8 },
  title: { fontSize: 16, fontWeight: "700", color: C.ink },
  sub: { fontSize: 13, color: C.muted },
});