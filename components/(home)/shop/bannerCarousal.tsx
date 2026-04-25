import React from "react";
import { ScrollView, View, Text, Pressable, Dimensions } from "react-native";
import { BANNERS, Banner } from "./shopData";
import { shopStyles as styles } from "./styles/shop.style";

const { width } = Dimensions.get("window");

function BannerCard({ item }: { item: Banner }) {
  return (
    <View style={[styles.bannerCard, { backgroundColor: item.bg, width: width * 0.75 }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.bannerTitle, { color: item.accent }]}>{item.title}</Text>
        <Text style={styles.bannerSub}>{item.subtitle}</Text>
        <Pressable style={[styles.bannerBtn, { backgroundColor: item.accent }]}>
          <Text style={styles.bannerBtnText}>Come On</Text>
        </Pressable>
      </View>
      <Text style={styles.bannerEmoji}>{item.emoji}</Text>
    </View>
  );
}

export default function BannerCarousel() {
  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bannerList}>
        {BANNERS.map((b) => <BannerCard key={b.id} item={b} />)}
      </ScrollView>
    </>
  );
}