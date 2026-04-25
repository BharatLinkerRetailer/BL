import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

interface QuickActionItem {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

interface Props {
  onOrdersPress?: () => void;
  onSupportPress?: () => void;
  onProfilePress?: () => void;
}

const QuickActionButton: React.FC<QuickActionItem> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
    {icon}
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

export const QuickActionsRow: React.FC<Props> = ({
  onOrdersPress,
  onSupportPress,
  onProfilePress,
}) => (
  <View style={styles.container}>
    <QuickActionButton
      icon={<Ionicons name="bag-handle-outline" size={26} color="#444" />}
      label={"Your\nOrders"}
    />
    <View style={styles.divider} />
    <QuickActionButton
      icon={<Feather name="user" size={26} color="#444" />}
      label={"Your\nProfile"}
      onPress={onProfilePress ?? (() => router.push("/user/profile"))}
    />
    <View style={styles.divider} />
    <QuickActionButton
      icon={<MaterialCommunityIcons name="message-text-outline" size={26} color="#444" />}
      label={"Help &\nSupport"}
      onPress={onSupportPress ?? (() => router.push("/user/helpAndSupport"))}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 14,
  },
  button: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#1A1A1A",
    textAlign: "center",
    lineHeight: 17,
  },
  divider: {
    width: 1,
    backgroundColor: "#EFEFEF",
    marginVertical: 4,
  },
});