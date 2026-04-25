// components/LocationOption.tsx
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style/locationScreen.style";

type Props = {
  icon: string;
  title: string;
  subtitle?: string;
  button?: string;
  isLast?: boolean;
  isLoadingLocation?: boolean;
  onPress?: () => void;
};

export default function LocationOption({
  icon,
  title,
  subtitle,
  button,
  isLast,
  isLoadingLocation,
  onPress,
}: Props) {
  return (
    <View>
      <TouchableOpacity
        style={styles.row}
        onPress={isLoadingLocation ? undefined : onPress} // ✅ disabled when loading
        activeOpacity={isLoadingLocation ? 1 : 0.7} // ✅ no opacity effect when loading
      >
        <View style={styles.left}>
          <Ionicons name={icon as any} size={22} color="#ff2d55" />

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>

        {/* 🔹 Right Side */}
        {button ? (
          <TouchableOpacity
            style={[
              styles.enableBtn,
              isLoadingLocation && styles.enableBtnDisabled,
            ]}
            onPress={isLoadingLocation ? undefined : onPress}
            activeOpacity={isLoadingLocation ? 1 : 0.7}
          >
            {isLoadingLocation ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.enableText}>{button}</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {!isLast && <View style={styles.divider} />}
    </View>
  );
}
