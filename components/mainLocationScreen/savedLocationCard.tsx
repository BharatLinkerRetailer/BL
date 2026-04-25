// screens/savedLocationCard.tsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SavedLocationCardProps {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  delete?: string;
  isLast?: boolean;
  isSelected?: boolean;
  onDelete?: (id: string) => void;
  onSelect?: (id: string) => void;
}

export default function SavedLocationCard({
  id,
  icon,
  title,
  subtitle,
  delete: canDelete,
  isLast,
  isSelected,
  onDelete,
  onSelect,
}: SavedLocationCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        !isLast && styles.borderBottom,
        isSelected && styles.selectedCard,
      ]}
      onPress={() => onSelect?.(id)}
      activeOpacity={0.7}
    >
      {/* Left Icon */}
      <View style={[styles.iconContainer, isSelected && styles.selectedIcon]}>
        <Ionicons
          name={icon as any}
          size={20}
          color={isSelected ? "#fff" : "#f97316"}
        />
      </View>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {String(title)}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {String(subtitle)}
        </Text>
      </View>

      {/* Selected checkmark OR delete button */}
      {isSelected ? (
        <Ionicons name="checkmark-circle" size={20} color="#f97316" />
      ) : canDelete === "yes" ? (
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation?.();
            onDelete?.(id);
          }}
          style={styles.deleteBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="trash-outline" size={18} color="#ef4444" />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 7,
    gap: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  selectedCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#fff7ed",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  selectedIcon: {
    backgroundColor: "#f97316",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: "#94a3b8",
  },
  deleteBtn: {
    padding: 4,
  },
});