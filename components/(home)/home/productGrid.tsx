// components/(home)/home/ProductGrid.tsx
import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";   // ← Add this import

import type { ProductEntry } from "../../../firebase/product/fetchProduct";
import { Product } from "../../../types/product/product";
import { ProductCard } from "./productCard";
import { useHomeProductStore } from "../../../store/home/productStore";

interface ProductGridProps {
  onProductPress: (product: Product) => void;
  selectedCategory?: string;
}

export default function ProductGrid({
  onProductPress,
  selectedCategory = "All",
}: ProductGridProps): React.JSX.Element {
  const {
    entries,
    status,
    hasMore,
    isRefreshing,
    fetchInitial,
    fetchMore,
    refresh,
  } = useHomeProductStore();

  useEffect(() => {
    if (status === "idle") {
      fetchInitial();
    }
  }, [status, fetchInitial]);

  const filteredEntries = useMemo(() => {
    if (selectedCategory === "All") return entries;
    return entries.filter(
      (entry: ProductEntry) => entry.product.category === selectedCategory
    );
  }, [entries, selectedCategory]);

  // ── Loading Skeleton ─────────────────────────────────────────────────────
  if (status === "loading") {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>⚡ Top Picks</Text>
        </View>

        <View style={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} style={[styles.cardSkeleton, styles.skeletonCard]} />
          ))}
        </View>
      </View>
    );
  }

  // ── Error State ───────────────────────────────────────────────────────────
  if (status === "error") {
    return (
      <View style={styles.wrapper}>
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>Failed to load products</Text>
          <TouchableOpacity onPress={fetchInitial} style={styles.retryBtn}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Premium Empty State ───────────────────────────────────────────────────
  if (status === "success" && filteredEntries.length === 0) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.emptyBox}>
          {/* Premium floating icon */}
          <View style={styles.emptyIconContainer}>
            <Ionicons
              name="search-outline"
              size={92}
              color="#CBD5E1"
              style={styles.emptyIcon}
            />
            {/* Subtle accent ring */}
            <View style={styles.emptyIconRing} />
          </View>

          <Text style={styles.emptyTitle}>
            {selectedCategory === "All"
              ? "Nothing Here Yet"
              : `No ${selectedCategory}`}
          </Text>

          <Text style={styles.emptySubtitle}>
            {selectedCategory === "All"
              ? "We haven't added any products in your area yet — but we're growing fast."
              : `No ${selectedCategory} products or stores are available right now in your location.`}
          </Text>

          <TouchableOpacity
            onPress={refresh}
            style={styles.emptyRefreshButton}
            activeOpacity={0.85}
          >
            <Ionicons name="refresh" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.emptyRefreshText}>Refresh Feed</Text>
          </TouchableOpacity>

          <Text style={styles.emptyHint}>
            New arrivals are added daily • Check back soon ✨
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚡ Top Picks</Text>
        <TouchableOpacity onPress={refresh}>
          <Text style={styles.seeAll}>View all →</Text>
        </TouchableOpacity>
      </View>

      {/* Product Grid */}
      <FlatList
        data={filteredEntries}
        keyExtractor={(entry: ProductEntry) => entry.product.id}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item }: { item: ProductEntry }) => (
          <ProductCard
            product={item.product}
            image={item.image}
            shopName="Bharat Linker"
            onPress={() => onProductPress(item.product)}
          />
        )}
        onEndReached={() => {
          if (hasMore && status !== "fetching-more") {
            fetchMore();
          }
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            colors={["#4CC9F0"]}
            tintColor="#4CC9F0"
          />
        }
        ListFooterComponent={
          status === "fetching-more" ? (
            <ActivityIndicator
              color="#4CC9F0"
              style={{ marginVertical: 20 }}
            />
          ) : null
        }
      />
    </View>
  );
}






















// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

    // ── PREMIUM EMPTY STATE STYLES ───────────────────────────────────────────
  emptyBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
    backgroundColor: "#f5f5f7",
  },

  emptyIconContainer: {
    position: "relative",
    marginBottom: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    zIndex: 2,
  },

  emptyIconRing: {
    position: "absolute",
    width: 128,
    height: 128,
    borderRadius: 999,
    borderWidth: 6,
    borderColor: "#4CC9F0",
    opacity: 0.12,
  },

  emptyTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.5,
  },

  emptySubtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#64748B",
    textAlign: "center",
    maxWidth: "100%",
    marginBottom: 40,
  },

  emptyRefreshButton: {
    backgroundColor: "#4CC9F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 999,
    shadowColor: "#4CC9F0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 32,
  },

  emptyRefreshText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.3,
  },

  emptyHint: {
    fontSize: 13.5,
    color: "#94A3B8",
    textAlign: "center",
    fontWeight: "500",
  },




  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F1F1F",
  },
  seeAll: {
    fontSize: 15,
    color: "#4CC9F0",
    fontWeight: "600",
  },
  grid: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardSkeleton: {
    width: "48%",
    height: 240,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
  },
  skeletonCard: {
    opacity: 0.7,
  },
  errorBox: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    marginBottom: 16,
    textAlign: "center",
  },
  retryBtn: {
    backgroundColor: "#4CC9F0",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },


});
