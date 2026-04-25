// components/product/ProductImageCarousel.tsx
import React, { useState } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { ProductImage } from "../../../types/product/product";

const { width: W } = Dimensions.get("window");
const IMAGE_HEIGHT = 400;
const PLACEHOLDER =
  "https://via.placeholder.com/800x800/F5F5F5/BDBDBD?text=No+Image";

interface Props {
  images: ProductImage[];
  rating?: number;
  reviewCount?: number;
}

export function ProductImageCarousel({ images, rating, reviewCount }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const data = images.length > 0 ? images : [null];

  return (
    <View style={styles.root}>
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) =>
          setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / W))
        }
        keyExtractor={(item, i) => item?.id ?? `ph-${i}`}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item?.url ?? PLACEHOLDER }}
            style={styles.image}
          />
        )}
      />

      {/* Dot indicators — bottom center */}
      {data.length > 1 && (
        <View style={styles.dotsRow}>
          {data.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}

      {/* Rating badge — bottom right */}
      {rating !== undefined && (
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          <Ionicons name="star" size={12} color="#fff" />
          {reviewCount !== undefined && (
            <Text style={styles.reviewCount}>  {reviewCount}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: W,
    height: IMAGE_HEIGHT,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  image: {
    width: W,
    height: IMAGE_HEIGHT,
    backgroundColor: "#984242",
  },

  infoBtn: {
    position: "absolute",
    bottom: 14,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#DCDCDC",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },

  dotsRow: {
    position: "absolute",
    bottom: 22,
    alignSelf: "center",
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D0D0D0",
  },
  dotActive: {
    backgroundColor: "#212121",
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  ratingBadge: {
    position: "absolute",
    bottom: 45,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#388E3C",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  ratingText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  reviewCount: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    fontWeight: "500",
  },
});