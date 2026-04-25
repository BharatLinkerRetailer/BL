import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

interface Props {
  balance: number;
  onAddBalance?: () => void;
  onPress?: () => void;
}

export const ZeptoCashCard: React.FC<Props> = ({ balance, onAddBalance, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.85}>
    <View style={styles.top}>
      <View style={styles.topLeft}>
        <MaterialCommunityIcons name="wallet" size={22} color="#7B3FE4" />
        <Text style={styles.title}>Zepto Cash & Gift Card</Text>
      </View>
      <View style={styles.newBadge}>
        <Text style={styles.newBadgeText}>NEW</Text>
      </View>
      <Feather name="chevron-right" size={18} color="#AAAAAA" style={{ marginLeft: 4 }} />
    </View>

    <View style={styles.divider} />

    <View style={styles.bottom}>
      <Text style={styles.balanceLabel}>
        Available Balance{" "}
        <Text style={styles.balanceAmount}>₹{balance}</Text>
      </Text>
      <TouchableOpacity style={styles.addButton} onPress={onAddBalance} activeOpacity={0.8}>
        <Text style={styles.addButtonText}>Add Balance</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDE7FA",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D9CCFA",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
  },
  topLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    marginLeft: 6,
  },
  newBadge: {
    backgroundColor: "#7B3FE4",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
  },
  newBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: "#D0C2F5",
    marginVertical: 12,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  balanceLabel: {
    fontSize: 14,
    color: "#888888",
  },
  balanceAmount: {
    fontWeight: "700",
    color: "#1A1A1A",
  },
  addButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A1A",
  },
});