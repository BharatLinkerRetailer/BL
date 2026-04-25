import React from "react";
import { ScrollView, View, Text, Pressable, Dimensions } from "react-native";
import { BANNERS, Banner } from "./shopData";
import { bannerCarousalStyle } from "./style/bannerCarousal.style";

const { width } = Dimensions.get("window");

function BannerCard({ item }: { item: Banner }) {
  return (
    <View style={[bannerCarousalStyle.bannerCard, { backgroundColor: item.bg, width: width * 0.75 }]}>
      <View style={{ flex: 1 }}>
        <Text style={[bannerCarousalStyle.bannerTitle, { color: item.accent }]}>{item.title}</Text>
        <Text style={bannerCarousalStyle.bannerSub}>{item.subtitle}</Text>
        <Pressable style={[bannerCarousalStyle.bannerBtn, { backgroundColor: item.accent }]}>
          <Text style={bannerCarousalStyle.bannerBtnText}>Come On</Text>
        </Pressable>
      </View>
      <Text style={bannerCarousalStyle.bannerEmoji}>{item.emoji}</Text>
    </View>
  );
}

export default function BannerCarousel() {
  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={bannerCarousalStyle.bannerList}>
        {BANNERS.map((b) => <BannerCard key={b.id} item={b} />)}
      </ScrollView>
    </>
  );
}