// components/product/StickyHeader.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  title: string;
  price: number;       // paise
  thumbnailUrl?: string | null;
  onSearch?: () => void;
  onShare?: () => void;
}

function formatINR(paise: number) {
  return (paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function StickyHeader({
  title,
  price,
  thumbnailUrl,
  onSearch,
  onShare,
}: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 4 }]}>
      {/* Back */}
      <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#212121" />
      </TouchableOpacity>

      {/* Thumbnail + name + price */}
      <View style={styles.middle}>
        {thumbnailUrl ? (
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumb}
            resizeMode="contain"
          />
        ) : null}
        <View style={styles.titleBlock}>
          <Text style={styles.titleText} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.priceText}>₹{formatINR(price)}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconBtn} onPress={onSearch}>
          <Ionicons name="search-outline" size={22} color="#212121" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={onShare}>
          <Ionicons name="share-social-outline" size={22} color="#212121" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 4 },
    }),
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  middle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 4,
    overflow: "hidden",
  },
  thumb: {
    width: 36,
    height: 36,
    borderRadius: 4,
    backgroundColor: "#F5F5F5",
    flexShrink: 0,
  },
  titleBlock: {
    flex: 1,
    overflow: "hidden",
  },
  titleText: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#212121",
  },
  priceText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#212121",
    marginTop: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 2,
  },
});