import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  onBack?: () => void;
}

export const SettingsHeader: React.FC<Props> = ({ onBack }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
      <Feather name="arrow-left" size={22} color="#1A1A1A" />
    </TouchableOpacity>
    <Text style={styles.title}>Settings</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#F2F2F7",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: 0.2,
  },
});