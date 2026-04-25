// components/ResultLocationCard.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  displayName: string;
  id?: string;
  isSelected?: boolean;
}

export default function ResultLocationCard({
  displayName,
  id,
  isSelected = false
}: Props) {
  const parts = displayName.split(",").map((p) => p.trim());
  const primaryName = parts[0] ?? "";
  const secondaryName = parts.slice(1, 3).join(", ") ?? "";
  const country = parts[parts.length - 1] ?? "";

  const isSavedMode = !!id;
  const Wrapper = isSavedMode ? TouchableOpacity : View;

  return (
    <Wrapper
      style={[styles.container, isSelected && styles.containerSelected]}
      {...(isSavedMode && {
        activeOpacity: 0.1
      })}
    >
      {/* Left Icon */}
      <View style={[styles.iconBox, isSelected && styles.iconBoxSelected]}>
        <Ionicons
          name="location"
          size={18}
          color={isSelected ? "#fff" : "#ff2d55"}
        />
      </View>

      {/* Text Block */}
      <View style={styles.textBox}>
        <Text style={styles.primary} numberOfLines={1}>
          {primaryName}
        </Text>
        {secondaryName.length > 0 && (
          <Text style={styles.secondary} numberOfLines={1}>
            {secondaryName}
          </Text>
        )}
      </View>

      {/* Right side */}
      <View style={styles.rightBox}>
        {country.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText} numberOfLines={1}>
              {country}
            </Text>
          </View>
        )}
        
      </View>
    </Wrapper>
  );
}











const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 4,
    borderRadius: 12,
  },
  containerSelected: {
    backgroundColor: "#fff0f3",
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#fff0f3",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  iconBoxSelected: {
    backgroundColor: "#ff2d55",
  },
  textBox: {
    flex: 1,
  },
  primary: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 2,
  },
  secondary: {
    fontSize: 12,
    color: "#94a3b8",
  },
  rightBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
  },
  badge: {
    backgroundColor: "#f1f5f9",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    maxWidth: 80,
  },
  badgeText: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "500",
  },
  checkIcon: {
    marginLeft: 2,
  },
  deleteBtn: {
    marginLeft: 2,
  },
});