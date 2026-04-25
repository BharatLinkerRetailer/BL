
// components/shop/product/index.tsx
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { StyleSheet, View, Animated, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useInfoShopStore } from "../../../store/shop/infoShopStore";
import { useProductStore } from "../../../store/shop/productStore";

import Header from "./header";
import ProductGrid from "./productGrid";
import Toolbar from "./toolBar";
import SortSheet from "./sortSheet";
import FilterSheet from "./filterSheet";
import EmptyState from "./emptyState";

import type { ProductEntry } from "../../../firebase/shop/fetchShopProduct";

const { width: SCREEN_W } = Dimensions.get("window");
const CARD_W = (SCREEN_W - 16 * 2 - 12) / 2;

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

export default function IndexShopProduct() {
  const { shopId } = useLocalSearchParams<{ shopId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { getShop, fetchShop } = useInfoShopStore();
  const { getProducts, fetchProducts, isLoading, getError } = useProductStore();

  const shop = getShop(shopId as string);
  const rawProducts = getProducts(shopId as string);

  const [sortBy, setSortBy] = useState<SortOptionValue>("newest");
  const [filters, setFilters] = useState<ActiveFilter>(DEFAULT_FILTER);
  const [appliedFilters, setAppliedFilters] =
    useState<ActiveFilter>(DEFAULT_FILTER);
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  // Fetch data
  useEffect(() => {
    if (!shopId) return;
    if (!shop) fetchShop(shopId as string);
    fetchProducts(shopId as string);
  }, [shopId, shop]);

  const onRefresh = useCallback(async () => {
    if (!shopId) return;
    setRefreshing(true);
    await fetchProducts(shopId as string);
    setRefreshing(false);
  }, [shopId]);

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    rawProducts.forEach(
      ({ product }) => product.category && cats.add(product.category),
    );
    return Array.from(cats);
  }, [rawProducts]);

  const displayProducts = useMemo(() => {
    let list = [...rawProducts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(({ product }) =>
        product.title.toLowerCase().includes(q),
      );
    }

    if (appliedFilters.categories.length > 0) {
      list = list.filter(({ product }) =>
        appliedFilters.categories.includes(product.category),
      );
    }

    if (appliedFilters.inStockOnly) {
      list = list.filter(({ variant }) => variant.status === "active");
    }

    // Sort
    switch (sortBy) {
      case "price_asc":
        list.sort((a, b) => a.variant.price - b.variant.price);
        break;
      case "price_desc":
        list.sort((a, b) => b.variant.price - a.variant.price);
        break;
      case "newest":
        list.sort(
          (a, b) =>
            b.product.createdAt.toMillis() - a.product.createdAt.toMillis(),
        );
        break;
      case "popular":
        list.sort((a, b) => a.product.title.localeCompare(b.product.title));
        break;
    }

    return list;
  }, [rawProducts, searchQuery, appliedFilters, sortBy]);

  const isLoadingState = isLoading(shopId as string);
  const filterCount = activeFilterCount(appliedFilters);
  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Sort";

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, insets.top - 110],
    extrapolate: "clamp",
  });
 
  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F4" }}>
      <Animated.View
        style={[
          styles.headerContainer,
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <Header
          shopName={shop?.shopName ?? ""}
          scrollY={scrollY}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
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
        products={displayProducts}
        isLoading={isLoadingState && rawProducts.length === 0}
        refreshing={refreshing}
        onRefresh={onRefresh}
        scrollY={scrollY}
        headerOffset={190 + 44}
        ListEmptyComponent={
          <EmptyState filtered={filterCount > 0 || !!searchQuery.trim()} />
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
    position: "absolute", // ← floats over scroll content
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F3F4F4",
    paddingHorizontal: 16,
    paddingBottom: 0,
    paddingTop: 50,
    zIndex: 100,
    color: "white",
  },
  insetCap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F3F4F4",
    zIndex: 101,
  },
});
