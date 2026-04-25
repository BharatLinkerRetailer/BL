import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";

interface Props {
  onPress?: () => void;
  loading?: boolean;
  label?: string;
}

export const SubmitButton: React.FC<Props> = ({
  onPress,
  loading = false,
  label = "Submit",
}) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
    activeOpacity={0.85}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator color="#FFFFFF" />
    ) : (
      <Text style={styles.label}>{label}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4A0E8F",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
});