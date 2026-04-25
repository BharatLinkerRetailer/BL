// components/product/ProductPriceTag.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { CurrencyAmount } from "../../../types/product/product";

interface Props {
  price: CurrencyAmount;
  compareAtPrice?: CurrencyAmount;
}

function formatINR(paise: number): string {
  return (paise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function ProductPriceTag({ price, compareAtPrice }: Props) {
  const hasDiscount = !!compareAtPrice && compareAtPrice > price;
  const discountPct = hasDiscount
    ? Math.round(((compareAtPrice! - price) / compareAtPrice!) * 100)
    : 0;

  return (
    <View style={styles.row}>
      {/* Selling Price */}
      <Text style={styles.price}>₹{formatINR(price)}</Text>

      {hasDiscount && (
        <>
          {/* Strikethrough MRP */}
          <Text style={styles.mrp}>₹{formatINR(compareAtPrice!)}</Text>

          {/* Discount Pill */}
          <View style={styles.pill}>
            <Text style={styles.pillText}>{discountPct}% OFF</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 6,
  },
  price: {
    fontSize: 34,
    fontWeight: "800",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  mrp: {
    fontSize: 18,
    fontWeight: "500",
    color: "#A0A0A0",
    textDecorationLine: "line-through",
    alignSelf: "flex-end",
    marginBottom: 3,
  },
  pill: {
    backgroundColor: "#FFF0F0",
    borderWidth: 1,
    borderColor: "#FFCDD2",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-end",
    marginBottom: 3,
  },
  pillText: {
    color: "#D32F2F",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.3,
  },
});