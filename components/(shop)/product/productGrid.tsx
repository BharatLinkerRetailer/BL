// components/shop/product/ProductGrid.tsx
import React from "react";
import { useRouter } from "expo-router";
import { Animated, FlatList, RefreshControl, View, StyleSheet } from "react-native";
import type { ProductEntry } from "../../../firebase/shop/fetchShopProduct";
import { ProductCard } from "./productCard";
import { useCallback } from "react";

import { Product } from "../../../types/product/product";
const BCK = "#F3F4F4";

type ProductGridProps = {
  products: ProductEntry[];
  isLoading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  scrollY: Animated.Value;
  headerOffset: number;
  ListEmptyComponent: React.ReactElement;
};

export default function ProductGrid({
  products,
  isLoading,
  refreshing,
  onRefresh,
  scrollY,
  headerOffset,
  ListEmptyComponent,
}: ProductGridProps) {
   const router = useRouter(); // ✅ add this


   
    const handleProductPress = useCallback((entry:any) => {
      // Safety check - in case entry is string or malformed
      let productId: string;
      let defaultVariantId: string | undefined;
    
      if (typeof entry === "string") {
        // Fallback if somehow a string ID was passed
        productId = entry;
      } else if (entry?.product?.id) {
        // Normal case: full ProductEntry object
        productId = entry.product.id;
        defaultVariantId = entry.variant?.id || entry.product.defaultVariantId;
      } else if (entry?.id) {
        // Alternative case: direct product object
        productId = entry.id;
        defaultVariantId = entry.defaultVariantId;
      } else {
        console.error("Invalid entry received in handleProductPress:", entry);
        return;
      }
    
      router.push({
        pathname: "/product/[productId]",
        params: {
          productId,
          defaultVariantId: defaultVariantId || "",
        },
      });
    }, [router]);
  return (
    <Animated.FlatList
      data={products}
      keyExtractor={(item) => item.variant.id}
      numColumns={2}
      contentContainerStyle={[styles.content, { paddingTop: headerOffset }]}
      columnWrapperStyle={styles.columnWrapper}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#021526" />
      }
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({ item }) => (
        <ProductCard
          product={item.product}
          variant={item.variant}
          shopName="BharatLinker"
          image={item.image}
          onPress={() => handleProductPress(item.product)} // ✅ arrow function
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    backgroundColor: BCK,
  },
  columnWrapper: {
    gap: 12,
    justifyContent: "space-between",
  },
});