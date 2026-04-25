import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  onBack?: () => void;
}

export const ProfileHeader: React.FC<Props> = ({ onBack }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backButton}>
      <Feather name="arrow-left" size={22} color="#1A1A1A" />
    </TouchableOpacity>
    <Text style={styles.title}>Profile</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth:0.2,
    borderColor:"#ddddddaf"
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: 0.2,
  },
});