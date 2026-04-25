import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useInfoShopStore } from "../../../store/shop/infoShopStore";
import { C } from "../infoConstant";
import { HERO_HEIGHT, HEADER_MIN, MOCK_BANNERS, TabKey } from "../infoConstant";

import ChatAITab from "./chatAI";
import DeliveryTab from "./deliveryTab";
import InfoTab from "./infoTab";

import ShopHero from "./shopHero";
import ShopInfoCard from "./shopInfoCard";
import ShopTopBar from "./shopTopbar";
import ShopTabBar from "./shopTabbar";




export default function IndexShopInfo() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { shopId } = useLocalSearchParams<{ shopId: string }>();
  const { fetchShop, getShop, loadingIds, errors } = useInfoShopStore();

  const shop = getShop(shopId);
  const loading = loadingIds[shopId] ?? false;
  const error = errors[shopId] ?? null;

  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState<TabKey>("info");
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    if (shopId && !shop) fetchShop(shopId);
  }, [shopId]);

  useEffect(() => {
    const t = setInterval(
      () => setBannerIndex((i) => (i + 1) % MOCK_BANNERS.length),
      3500,
    );
    return () => clearInterval(t);
  }, []);

  const heroOpacity = scrollY.interpolate({
    inputRange: [0, HERO_HEIGHT - HEADER_MIN - insets.top],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const heroScale = scrollY.interpolate({
    inputRange: [-80, 0],
    outputRange: [1.12, 1],
    extrapolate: "clamp",
  });

  const headerBg = scrollY.interpolate({
    inputRange: [
      HERO_HEIGHT - HEADER_MIN - insets.top - 20,
      HERO_HEIGHT - HEADER_MIN - insets.top,
    ],
    outputRange: ["transparent", C.navy],
    extrapolate: "clamp",
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [HERO_HEIGHT - 100, HERO_HEIGHT - 60],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: "white" }]}>
        <ActivityIndicator size="large" color={C.gold} />
        <Text style={styles.loadingText}>Loading shop…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: C.ivory }]}>
        <Ionicons name="alert-circle-outline" size={48} color={C.red} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryBtn}
          onPress={() => fetchShop(shopId)}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const shopName = shop?.shopName ?? "Shop";
  // const banners = shop?.bannerImages ?? MOCK_BANNERS;
  const banners =MOCK_BANNERS;

  return (
    <View style={{ flex: 1, backgroundColor: C.ivory }}>
      <ShopHero
        banners={banners}
        bannerIndex={bannerIndex}
        heroOpacity={heroOpacity}
        heroScale={heroScale}
        heroHeight={HERO_HEIGHT}
      />

      <ShopTopBar
        shopId={shopId}
        insetsTop={insets.top}
        headerBg={headerBg}
        titleOpacity={titleOpacity}
        shopName={shopName}
        onBack={() => router.back()}
      />

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: HERO_HEIGHT - 32 }}
      >
        <ShopInfoCard shop={shop} />
        <ShopTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "info" && <InfoTab shop={shop} />}
        {activeTab === "delivery" && <DeliveryTab/>}
        {activeTab === "chat-ai" && <ChatAITab/>}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: C.white,
    fontWeight: "600",
    marginTop: 8,
  },
  errorText: {
    fontSize: 14,
    color: C.red,
    textAlign: "center",
    paddingHorizontal: 32,
  },
  retryBtn: {
    marginTop: 8,
    backgroundColor: C.navy,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  retryText: { color: C.white, fontWeight: "700", fontSize: 14 },
});
