// ─── components/(home)/category/index.tsx ──────────────────────────────────────────────────

import React, { useRef, useState } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Header from "./categoryHeader";
import CategoryPills from "./categoryPills";
import BannerCarousel from "./bannerCarousal";
import CategoryGrid from "./categoryGrid";
import { categoryHeaderStyle } from "./style/categoryHeader.style";
import {
  CATEGORY_TABS,
  getSubCategories,
} from "../../../constants/categoryData"; // ✅ added CATEGORY_TABS

const HEADER_HEIGHT = 158;

export default function CategoryScreen(): React.JSX.Element {
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // ✅ removed dead activeCategory state

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Animated.View
        style={[
          categoryHeaderStyle.container,
          
        ]}
      >
        <Header
          scrollY={scrollY}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </Animated.View>

      <Animated.View
        style={[categoryHeaderStyle.inset, { height: insets.top }]}
      />

      <Animated.ScrollView
        contentContainerStyle={{
          backgroundColor: "white",
          paddingTop: HEADER_HEIGHT + 10,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      >
        <CategoryPills
          tabs={CATEGORY_TABS}
          activeTab={activeTab}
          onSelect={setActiveTab}
        />
        {/* <BannerCarousel /> */}
        <CategoryGrid
          activeTab={activeTab}
          onItemPress={(item) => router.push(`/category`)}
        />
        <View style={{ height: 0 }} />
      </Animated.ScrollView>
    </View>
  );
}
