import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  onDelete?: () => void;
}

export const DeleteAccountSection: React.FC<Props> = ({ onDelete }) => (
  <View style={styles.container}>
    <View style={styles.separator} />
    <TouchableOpacity onPress={onDelete} activeOpacity={0.7}>
      <Text style={styles.title}>Delete Account</Text>
    </TouchableOpacity>
    <Text style={styles.description}>
      Deleting your account will remove all your orders, wallet amount and any
      active referral
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginBottom: 24,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#E53935",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#1A1A1A",
    lineHeight: 22,
  },
});