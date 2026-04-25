import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  onPress?: () => void;
}

export const UpdateBanner: React.FC<Props> = ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.iconWrap}>
      <Feather name="settings" size={22} color="#555" />
    </View>
    <View style={styles.textWrap}>
      <Text style={styles.title}>Update Available</Text>
      <Text style={styles.subtitle}>Enjoy a more seamless shopping experience</Text>
    </View>
    <View style={styles.newBadge}>
      <Text style={styles.newBadgeText}>New</Text>
    </View>
    <Feather name="chevron-right" size={18} color="#AAAAAA" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    gap: 10,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: "#888888",
    lineHeight: 16,
  },
  newBadge: {
    backgroundColor: "#22C55E",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  newBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
});