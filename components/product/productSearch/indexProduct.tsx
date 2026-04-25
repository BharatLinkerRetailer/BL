/// components/product/productSearch/indexProductSearch.tsx
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { StyleSheet, View, Animated, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Header from "./header";
import ProductGrid from "./productGrid";
import Toolbar from "./toolBar";
import SortSheet from "./sortSheet";
import FilterSheet from "./filterSheet";
import EmptyState from "./emptyState";

import { useSearchProductStore } from "../../../store/product/useSearchProductStore";

const { width: SCREEN_W } = Dimensions.get("window");

type SortOptionValue = "newest" | "price_asc" | "price_desc" | "popular";

type ActiveFilter = {
  categories: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
};

const SORT_OPTIONS: { label: string; value: SortOptionValue }[] = [
  { label: "Newest first", value: "newest" },
  { label: "Price: low → high", value: "price_asc" },
  { label: "Price: high → low", value: "price_desc" },
  { label: "Most popular", value: "popular" },
];

const DEFAULT_FILTER: ActiveFilter = {
  categories: [],
  priceRange: [0, 100000],
  inStockOnly: false,
};

function activeFilterCount(f: ActiveFilter): number {
  let n = 0;
  if (f.categories.length > 0) n++;
  if (f.inStockOnly) n++;
  if (f.priceRange[0] !== 0 || f.priceRange[1] !== 100000) n++;
  return n;
}

export default function IndexSearchProductScreen() {
  const { category } = useLocalSearchParams<{ category?: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // ─── Zustand Store (matches your current store) ─────────────────────
  const {
    entries: rawProducts,
    status,
    isRefreshing,
    fetchInitial,
    fetchMore,
    refresh,
  } = useSearchProductStore();

  // ─── Local UI State ────────────────────────────────────────────────────
  const [sortBy, setSortBy] = useState<SortOptionValue>("newest");
  const [filters, setFilters] = useState<ActiveFilter>(DEFAULT_FILTER);
  const [appliedFilters, setAppliedFilters] = useState<ActiveFilter>(DEFAULT_FILTER);
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  // Derived loading states from store's "status"
  const loading = status === "loading";
  const loadingMore = status === "fetching-more";

  // ─── Initial load ─────────────────────────────────────────────────────
  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  // ─── Pull-to-refresh ───────────────────────────────────────────────────
  const onRefresh = useCallback(async () => {
    await refresh();
  }, [refresh]);

  // ─── All available categories for FilterSheet ──────────────────────────
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    rawProducts.forEach(({ product }) => {
      if (product.category) cats.add(product.category);
    });
    return Array.from(cats);
  }, [rawProducts]);

  

  const filterCount = activeFilterCount(appliedFilters);
  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Sort";

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, insets.top - 110],
    extrapolate: "clamp",
  });

const handleProductPress = useCallback((entry: any) => {
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
    <View style={{ flex: 1, backgroundColor: "#F3F4F4" }}>
      <Animated.View
        style={[
          styles.headerContainer,
        ]}
      >
        <Header
          searchQuery=""               // ← dummy (store has no search yet)
          onSearchChange={() => {}}    // ← dummy
          autoFocus={false}
        />
        <Toolbar
          sortLabel={currentSortLabel}
          filterCount={filterCount}
          onSortPress={() => setShowSort(true)}
          onFilterPress={() => {
            setFilters(appliedFilters);
            setShowFilter(true);
          }}
        />
      </Animated.View>

      <View style={[styles.insetCap, { height: insets.top }]} />

      <ProductGrid
        products={rawProducts}
        isLoading={loading && rawProducts.length === 0}
        loadingMore={loadingMore}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        onEndReached={fetchMore}
        scrollY={scrollY}
        headerOffset={185}
        onProductPress={handleProductPress}
        ListEmptyComponent={
          <EmptyState
            filtered={filterCount > 0}
          />
        }
      />

      <SortSheet
        visible={showSort}
        current={sortBy}
        onSelect={setSortBy}
        onClose={() => setShowSort(false)}
      />

      <FilterSheet
        visible={showFilter}
        categories={allCategories}
        filters={filters}
        onChange={setFilters}
        onApply={() => setAppliedFilters(filters)}
        onClose={() => setShowFilter(false)}
        onClear={() => {
          setFilters(DEFAULT_FILTER);
          setAppliedFilters(DEFAULT_FILTER);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom:10,
    zIndex: 100,
  },
  insetCap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f4f4f4",
    zIndex: 101,
  },
});