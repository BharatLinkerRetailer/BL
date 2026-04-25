import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  name: string;
  phone: string;
}

export const ProfileCard: React.FC<Props> = ({ name, phone }) => (
  <View style={styles.container}>
    <View style={styles.avatar}>
      <Ionicons name="person" size={32} color="#FFFFFF" />
    </View>
    <View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.phone}>{phone}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
    marginTop: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#7B3FE4",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: "#888888",
    letterSpacing: 0.5,
  },
});