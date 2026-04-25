// components/product/productSearch/ProductGrid.tsx
import React from "react";
import {
  Animated,
  FlatList,
  RefreshControl,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import type { ProductEntry } from "../../../firebase/product/fetchProduct";
import { ProductCard } from "./productCard";

const BCK = "#f4f4f4";

type ProductGridProps = {
  products: ProductEntry[];           // ← Required
  isLoading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
  scrollY: Animated.Value;
  headerOffset: number;
  onProductPress: (entry: ProductEntry) => void;
  ListEmptyComponent: React.ReactElement;
};

export default function ProductGrid({
  products,
  isLoading,
  loadingMore,
  refreshing,
  onRefresh,
  onEndReached,
  scrollY,
  headerOffset,
  onProductPress,
  ListEmptyComponent,
}: ProductGridProps) {
  return (
    <Animated.FlatList
      data={products}
      keyExtractor={(item) => item.product.id}   // ← Safe (no variant needed)
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
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#021526"
        />
      }
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={
        loadingMore ? (
          <View style={styles.footer}>
            <ActivityIndicator size="small" color="#021526" />
          </View>
        ) : null
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <ProductCard
          product={item.product}
          image={item.image}
          shopName="BharatLinker"
          onPress={() => onProductPress(item)}
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
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
});