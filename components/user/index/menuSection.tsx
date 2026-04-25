import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const MenuSection: React.FC<Props> = ({ title, children }) => (
  <View style={styles.wrapper}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.card}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 10,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
  },
});