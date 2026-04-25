// ─── app/shop/index.tsx ─────────────────────────────────────────────────────
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, View, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Header from "./shopHeader";
import CategoryPills from "./categoryPills";
import BannerCarousel from "./bannerCarousal";
import ShopList from "./shopList";
import { shopHeaderStyle } from "./styles/shopHeader.styles";

import { useShopStore } from "../../../store/shop/shopStore";
import { ShopListItem } from "../../../types/shop/shop";

import SortSheet from "./sortSheet";
import FilterSheet from "./filterSheet";

const HEADER_HEIGHT = 190;

export default function ShopScreen(): React.JSX.Element {
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Modal visibility
  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  // Store selectors
  const shops = useShopStore((s) => s.shops);
  const loading = useShopStore((s) => s.loading);
  const loadingMore = useShopStore((s) => s.loadingMore);
  const hasMore = useShopStore((s) => s.hasMore);
  const searchQuery = useShopStore((s) => s.searchQuery);
  const activeCategory = useShopStore((s) => s.activeCategory);
  const sortBy = useShopStore((s) => s.sortBy);
  const filters = useShopStore((s) => s.filters);

  const setSearchQuery = useShopStore((s) => s.setSearchQuery);
  const setCategory = useShopStore((s) => s.setCategory);
  const setSort = useShopStore((s) => s.setSort);
  const setFilters = useShopStore((s) => s.setFilters);
  const refresh = useShopStore((s) => s.refresh);
  const loadMore = useShopStore((s) => s.loadMore);
  const init = useShopStore((s) => s.init);

  // Dynamic active filter count (✅ NOW MATCHES ShopFilters exactly)
  const activeFilterCount = useMemo(() => {
    let count = 0;

    // Categories
    if (filters.categories?.length && filters.categories.length > 0) count++;

    // Availability toggles
    if (filters.isOpen === true) count++;
    if (filters.deliveryAvailable === true) count++;
    if (filters.homeServiceAvailable === true) count++;
    if (filters.pickupAvailable === true) count++;

    return count;
  }, [filters]);

  // Initialize store on mount
  useEffect(() => {
    init();
  }, [init]);

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, insets.top - 130],
    extrapolate: "clamp",
  });

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Animated.View
        style={[
          shopHeaderStyle.container,
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <Header
          scrollY={scrollY}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </Animated.View>

      <Animated.View style={[shopHeaderStyle.inset, { height: insets.top }]} />

      <Animated.ScrollView
        contentContainerStyle={{
          backgroundColor: "white",
          paddingTop: HEADER_HEIGHT + 10,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
      >
        <CategoryPills
          sortLabel="Sort By"
          filterCount={activeFilterCount}
          onSortPress={() => setSortVisible(true)}
          onFilterPress={() => setFilterVisible(true)}
        />
        <BannerCarousel />
        <ShopList
          shops={shops}
          loading={loading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          onLoadMore={loadMore}
          onShopPress={(shop: ShopListItem) => {
            // TODO: Navigate to shop detail
            // router.push(`/shop/${shop.shopId}`);
            console.log("Shop pressed:", shop.shopName);
          }}
        />
      </Animated.ScrollView>

      {/* Sheets */}
      <SortSheet
        visible={sortVisible}
        current={sortBy}
        onSelect={setSort}
        onClose={() => setSortVisible(false)}
      />

      <FilterSheet
        visible={filterVisible}
        filters={filters}
        onChange={setFilters}
        onApply={() => setFilterVisible(false)}
        onClose={() => setFilterVisible(false)}
        onClear={() => {
          // ✅ Full reset to match DEFAULT_FILTERS + all availability flags
          setFilters({
            categories: [],
            isOpen: false,
            deliveryAvailable: false,
            homeServiceAvailable: false,
            pickupAvailable: false,
          });
          setFilterVisible(false);
        }}
      />
    </View>
  );
}