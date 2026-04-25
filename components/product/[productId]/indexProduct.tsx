// app/product/[productId].tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useProductDetailStore } from "../../../store/product/productDetailStore";
import { ProductImageCarousel } from "./productImageCarousal";
import { StickyHeader } from "./stickyHeader";
import { ProductInfoCard } from "./productInfoCard";
import { KeyHighlights } from "./keyHighlights";
import { AccordionSection, AccordionText, AccordionList } from "./accordianSection";
import { FloatingCartBar } from "./floatingCartBar";
import type { Variant } from "../../../types/product/product";

const STICKY_THRESHOLD = 320;

export default function ProductDetailScreen() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  console.log(productId)
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { currentProduct, loading, error, fetchProductDetail } =
    useProductDetailStore();

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // ── Data fetching ─────────────────────────────────────────────────────
  useEffect(() => {
    if (productId) fetchProductDetail(productId);
  }, [productId]);

  // ── Auto-select default variant ───────────────────────────────────────
  useEffect(() => {
    if (!currentProduct?.variants?.length) return;
    const def =
      currentProduct.variants.find((v) => v.isDefault) ??
      currentProduct.variants[0];
    setSelectedVariant(def);
  }, [currentProduct]);

  // ── Scroll handler for sticky header ──────────────────────────────────
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    setShowStickyHeader(y > STICKY_THRESHOLD);
  };

  // ── Derived data ──────────────────────────────────────────────────────
  const product = currentProduct?.product;
  const images = currentProduct?.images ?? [];
  const variants = currentProduct?.variants ?? [];
  const inventoryMap = currentProduct?.inventory ?? {};
  const inventory = selectedVariant ? inventoryMap[selectedVariant.id] : null;

  const isUnavailable =
    selectedVariant?.status === "out_of_stock" ||
    selectedVariant?.status === "discontinued";

  const primaryImage = images.find((img) => img.isPrimary) ?? images[0] ?? null;

  // Build key highlights from variant attributes
  const highlights: Record<string, string> = selectedVariant?.attributes ?? {};

  // ── Loading state ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.stateScreen}>
        <ActivityIndicator size="large" color="#388E3C" />
        <Text style={styles.stateText}>Loading</Text>
      </View>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────
  if (error || !product || !selectedVariant) {
    return (
      <View style={styles.stateScreen}>
        <Ionicons name="alert-circle-outline" size={52} color="#E53935" />
        <Text style={[styles.stateText, { color: "#E53935", marginTop: 10 }]}>
          {error ?? "Product not found"}
        </Text>
        <TouchableOpacity
          style={styles.backPill}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={16} color="#fff" />
          <Text style={styles.backPillText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {/* Sticky Header / Floating Actions */}
      {showStickyHeader ? (
        <StickyHeader
          title={product.title}
          price={selectedVariant.price}
          thumbnailUrl={primaryImage?.url}
        />
      ) : (
        <View
          style={[styles.floatingActions, { top: insets.top }]}
          pointerEvents="box-none"
        >
          <TouchableOpacity
            style={styles.floatingBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={22} color="#212121" />
          </TouchableOpacity>
          <View style={styles.floatingRight}>
            <TouchableOpacity style={styles.floatingBtn}>
              <Ionicons name="search-outline" size={21} color="#212121" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.floatingBtn}>
              <Ionicons name="share-social-outline" size={21} color="#212121" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        bounces
      >
        <ProductImageCarousel
          images={images}
          rating={4.8}
          reviewCount={320}
        />

        <ProductInfoCard
          brand={product.title.split(" ")[0] ?? product.title}
          title={product.title}
          tags={product.tags ?? []}
          variant={selectedVariant}
          deliveryMins={22}
          netQty="1 pc"
          soldCount="2k+"
          isWishlisted={isWishlisted}
          onWishlistToggle={() => setIsWishlisted((v) => !v)}
        />

        {Object.keys(highlights).length > 0 && (
          <KeyHighlights highlights={highlights} defaultExpanded />
        )}

        <AccordionSection title="Product Details">
          <AccordionText text={product.description} />
        </AccordionSection>

        <AccordionSection title="Warranty Details">
          <AccordionList
            items={[
              { label: "Warranty Type", value: "Manufacturer Warranty" },
              { label: "Warranty Period", value: "1 Year" },
            ]}
          />
        </AccordionSection>

        <AccordionSection title="What's In The Box">
          <AccordionText text="1 × Product, 1 × User Manual" />
        </AccordionSection>

        <AccordionSection title="Product Description">
          <AccordionText text={product.description} />
        </AccordionSection>

        <AccordionSection title="Vendor Details">
          <AccordionList
            items={[
              { label: "Shop ID", value: product.shopId ?? "—" },
              { label: "Category", value: product.category ?? "—" },
            ]}
          />
        </AccordionSection>

        {/* Spacer for floating bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Floating Cart Bar (Fully Connected) ── */}
      <FloatingCartBar
        product={product}
        variant={selectedVariant}
        shopName={`Shop ${product.shopId}`}   // ← You can replace with real shop name if available
        imageUrl={primaryImage?.url}
        disabled={isUnavailable}
      />
    </View>
  );
}

//Styles 
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#ffffff" },
  scroll: { flex: 1 },

  // Floating header controls over the carousel
  floatingActions: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    zIndex: 10,
  },
  floatingRight: {
    flexDirection: "row",
    gap: 4,
  },
  floatingBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  // State screens
  stateScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    gap: 8,
  },
  stateText: {
    fontSize: 15,
    color: "#9E9E9E",
    fontWeight: "500",
  },
  backPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#388E3C",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 16,
  },
  backPillText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});