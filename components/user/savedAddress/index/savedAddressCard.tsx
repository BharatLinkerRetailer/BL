// screens/savedLocationCard.tsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Address } from "../../../../types/user/deliveryAddress";

interface SavedAddressCardProps {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  address: Address;
  canDelete?: boolean;
  isLast?: boolean;
  isSelected?: boolean;
  onDelete?: (id: string) => void;
  onSelect?: (id: string) => void;
}

export default function SavedAddressCard({
  id,
  icon,
  address,
  canDelete,
  isLast,
  isSelected,
  onDelete,
  onSelect,
}: SavedAddressCardProps) {
  const title = address.label || "Address";

  const line1 = [address.street, address.apartmentUnit]
    .filter(Boolean)
    .join(", ");

  const line2 = [address.city, address.state, address.postalCode]
    .filter(Boolean)
    .join(", ");

  const line3 = [address.country, address.landmark]
    .filter(Boolean)
    .join(" · ");

  return (
    <TouchableOpacity
      style={[
        styles.card,
        !isLast && styles.borderBottom,
        isSelected && styles.selectedCard,
      ]}
      onPress={() => onSelect?.(id)}
      activeOpacity={0.75}
    >
      {/* Left Icon */}
      <View style={[styles.iconContainer, isSelected && styles.selectedIcon]}>
        <Ionicons
          name={icon}
          size={18}
          color={isSelected ? "#fff" : "#f97316"}
        />
      </View>

      {/* Text */}
      <View style={styles.textContainer}>
        {/* Label */}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {/* Street + Apartment */}
        {!!line1 && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {line1}
          </Text>
        )}

        {/* City, State, Postal */}
        {!!line2 && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {line2}
          </Text>
        )}

        {/* Country · Landmark */}
        {!!line3 && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {line3}
          </Text>
        )}

        {/* Delivery Instructions */}
        {!!address.deliveryInstructions && (
          <Text style={styles.instructions} numberOfLines={2}>
            {address.deliveryInstructions}
          </Text>
        )}

        {/* Phone */}
        {!!address.phoneNumber && (
          <Text style={styles.phone}>PH: {address.phoneNumber}</Text>
        )}
      </View>

      {/* Right action */}
      {isSelected ? (
        <View style={styles.checkContainer}>
          <Ionicons name="checkmark" size={14} color="#f97316" />
        </View>
      ) : canDelete ? (
        <TouchableOpacity
          onPress={() => onDelete?.(id)}
          style={styles.deleteBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="trash-outline" size={16} color="#ef4444" />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 14,
    paddingHorizontal: 12,
    gap: 12,
    backgroundColor: "#fff",
  },
  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  selectedCard: {
    backgroundColor: "#fff7ed",
    borderRadius: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
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
    gap: 3,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 12,
    color: "#94a3b8",
    lineHeight: 16,
  },
  instructions: {
    fontSize: 11,fontWeight:500,
    color: "#ea0b47",
    lineHeight: 15,
  },
  phone: {
    fontSize: 11,
    color: "#64748b",
    lineHeight: 15,
  },
  checkContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#f97316",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#fef2f2",
    alignItems: "center",
    justifyContent: "center",
  },
}); 