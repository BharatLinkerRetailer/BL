import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  onPress?: () => void;
  showDivider?: boolean;
}

export const MenuItem: React.FC<Props> = ({
  icon,
  label,
  subtitle,
  onPress,
  showDivider = true,
}) => (
  <>
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.6}>
      <View style={styles.left}>
        <View style={styles.iconWrap}>{icon}</View>
        <View>
          <Text style={styles.label}>{label}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      <Feather name="chevron-right" size={18} color="#AAAAAA" />
    </TouchableOpacity>
    {showDivider && <View style={styles.divider} />}
  </>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconWrap: {
    width: 28,
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1A1A1A",
  },
  subtitle: {
    fontSize: 12,
    color: "#888888",
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#EFEFEF",
    marginLeft: 58,
  },
});