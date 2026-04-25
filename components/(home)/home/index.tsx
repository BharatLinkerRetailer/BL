// ─── components/(home)/home/index.tsx ──────────────────────────────────────

import React, { useRef, useState } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Header from "./homeHeader";
import HeroBanner from "./heroBanner";
import PlatformBenefits from "./platformBenefits";
import HomeCategoryGrid from "./homeCategoryGrid";
import ProductGrid from "./productGrid";
import PromoBanner from "./promoBanner";

import { homeHeaderStyle } from "./style/homeHeader.style";
import { CartProvider, useCart } from "../../../hooks/cartConntext";

import { Product } from "../../../types/product/product";
import { HomeCategory } from "../../../types/home/index";
import { seedProducts } from "../../../firebase/product/addProductDemo";

const HEADER_HEIGHT = 230;

export default function HomeScreen(): React.JSX.Element {
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, insets.top - 130],
    extrapolate: "clamp",
  });

  /* ── Navigation handlers ──────────────────────────────────────────────── */
  const handleCategoryPress = (cat: HomeCategory) => {
    console.log("home category");
  };

  const handleProductPress = (product: Product) => {
    const params = new URLSearchParams({
      defaultVariantId: String(product.defaultVariantId),
      shopId: String(product.shopId),
    });
    router.push(`/product/${product.id}?${params.toString()}`);
  };

  return (
    // CartProvider wraps the screen so every child (ProductGrid) shares cart state
    <CartProvider>
      <View style={{ flex: 1, backgroundColor: "#f5f5f7" }}>
        {/* ── Floating collapsing header ─────────────────────────────────── */}
        <Animated.View
          style={[
            homeHeaderStyle.container,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Header
            scrollY={scrollY}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </Animated.View>

        {/* ── Status-bar spacer ─────────────────────────────────────────── */}
        <Animated.View
          style={[homeHeaderStyle.inset, { height: insets.top }]}
        />

        {/* ── Scrollable body ───────────────────────────────────────────── */}
        <Animated.ScrollView
          contentContainerStyle={{
            paddingTop: HEADER_HEIGHT,
            paddingBottom: 32,
            backgroundColor: "#f5f5f7",
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {/* 1 ── Hero carousel */}
          <HeroBanner />

          {/* 2 ── Deals strip */}
          <PlatformBenefits />

          {/* 3 ── Category icon grid */}
          <HomeCategoryGrid onPress={handleCategoryPress} />

          {/* 4 ── Top picks product grid (now filtered by header category) */}
          <ProductGrid
            selectedCategory={selectedCategory}
            onProductPress={handleProductPress}
          />

          {/* 5 ── Promo coupon banner */}
          {/* <PromoBanner /> */}
        </Animated.ScrollView>
      </View>
    </CartProvider>
  );
}