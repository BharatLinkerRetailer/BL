// components/product/ProductInfoCard.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Variant } from "../../../types/product/product";

interface Props {
  brand: string;          // e.g. "Philips Appliance"
  title: string;          // full product title
  tags: string[];         // e.g. ["Open Box Verification", "Capacity: 4.2 L"]
  variant: Variant;
  deliveryMins?: number;  // e.g. 22
  netQty?: string;        // e.g. "1 pc"
  soldCount?: string;     // e.g. "2k+"
  isWishlisted?: boolean;
  onWishlistToggle?: () => void;
}

function formatINR(paise: number) {
  return (paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function ProductInfoCard({
  brand,
  title,
  tags,
  variant,
  deliveryMins,
  netQty,
  soldCount,
  isWishlisted = false,
  onWishlistToggle,
}: Props) {
  const hasDiscount =
    !!variant.compareAtPrice && variant.compareAtPrice > variant.price;
  const discountPct = hasDiscount
    ? Math.round(
        ((variant.compareAtPrice! - variant.price) / variant.compareAtPrice!) *
          100
      )
    : 0;

  return (
    <View style={styles.root}>

      

      {/* ── Content ────────────────────────────────────────────── */}
      <View style={styles.content}>

        {/* Tags row */}
        {tags.length > 0 && (
          <View style={styles.tagsRow}>
            {tags.map((tag, i) => (
              <React.Fragment key={tag}>
                <Text style={styles.tagText}>{tag}</Text>
                {i < tags.length - 1 && (
                  <View style={styles.tagDivider} />
                )}
              </React.Fragment>
            ))}
          </View>
        )}

        {/* Brand + Wishlist */}
        <View style={styles.brandRow}>
          <Text style={styles.brandName}>{brand}</Text>
          <TouchableOpacity
            onPress={onWishlistToggle}
            style={styles.wishlistBtn}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isWishlisted ? "heart" : "heart-outline"}
              size={24}
              color={isWishlisted ? "#F02174" : "#9E9E9E"}
            />
          </TouchableOpacity>
        </View>

        {/* Full title */}
        <Text style={styles.titleText}>{title}</Text>

        {/* Net qty + delivery */}
        <View style={styles.metaRow}>
          {netQty && (
            <View style={styles.qtyChip}>
              <Text style={styles.qtyText}>Net Qty: {netQty}</Text>
            </View>
          )}
          {deliveryMins !== undefined && (
            <View style={styles.deliveryChip}>
              <Text style={styles.deliveryIcon}>⚡</Text>
              <Text style={styles.deliveryText}>{deliveryMins} mins</Text>
            </View>
          )}
        </View>

        {/* Price block */}
        <View style={styles.priceBlock}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{formatINR(variant.price)}</Text>
            {hasDiscount && (
              <Text style={styles.discountPct}>{discountPct}% Off</Text>
            )}
          </View>
          {hasDiscount && (
            <Text style={styles.mrp}>
              ₹{formatINR(variant.compareAtPrice!)}{" "}
              <Text style={styles.mrpLabel}>MRP (inclusive of all taxes)</Text>
            </Text>
          )}
        </View>

        {/* Social proof */}
        {soldCount && (
          <View style={styles.socialRow}>
            <Ionicons name="trending-up" size={14} color="#388E3C" />
            <Text style={styles.socialText}>
              {soldCount} bought in last month
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
    marginTop: 0,
  },

  // ── Promo Banner
  promoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF0FF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    overflow: "hidden",
  },
  bannerLines: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 32,
    flexDirection: "row",
    gap: 4,
  },
  bannerLine: {
    width: 3,
    flex: 1,
    backgroundColor: "#C5CAE9",
    transform: [{ skewX: "-20deg" }],
  },
  bannerText: {
    flex: 1,
    fontSize: 13.5,
    color: "#3949AB",
    fontWeight: "400",
    marginLeft: 24,
  },
  bannerBold: {
    fontWeight: "700",
    fontStyle: "italic",
  },

  // ── Content
  content: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },

  tagsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 0,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12.5,
    color: "#5C5C5C",
    fontWeight: "500",
  },
  tagDivider: {
    width: 1,
    height: 12,
    backgroundColor: "#CECECE",
    marginHorizontal: 8,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212121",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
    textDecorationColor: "#BDBDBD",
  },
  wishlistBtn: {
    padding: 4,
  },

  titleText: {
    fontSize: 13.5,
    color: "#616161",
    lineHeight: 20,
    fontWeight: "400",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },
  qtyChip: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  qtyText: {
    fontSize: 12.5,
    color: "#424242",
    fontWeight: "500",
  },
  deliveryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F1F8E9",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  deliveryIcon: {
    fontSize: 12,
  },
  deliveryText: {
    fontSize: 12.5,
    color: "#33691E",
    fontWeight: "700",
  },

  // ── Price
  priceBlock: {
    gap: 3,
    marginTop: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  price: {
    fontSize: 26,
    fontWeight: "800",
    color: "#212121",
    letterSpacing: -0.3,
  },
  discountPct: {
    fontSize: 16,
    fontWeight: "700",
    color: "#388E3C",
  },
  mrp: {
    fontSize: 13,
    color: "#757575",
    textDecorationLine: "line-through",
  },
  mrpLabel: {
    textDecorationLine: "none",
    fontSize: 12,
    color: "#9E9E9E",
  },

  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  socialText: {
    fontSize: 12.5,
    color: "#388E3C",
    fontWeight: "600",
  },
});