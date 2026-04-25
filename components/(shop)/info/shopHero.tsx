import React from "react";
import { View, StyleSheet, ImageBackground, Animated } from "react-native";
import { C } from "../infoConstant";

type Props = {
  banners: string[];
  bannerIndex: number;
  heroOpacity: any;
  heroScale: any;
  heroHeight: number;
};

export default function ShopHero({
  banners,
  bannerIndex,
  heroOpacity,
  heroScale,
  heroHeight,
}: Props) {
  return (
    <Animated.View
      style={[
        styles.hero,
        {
          height: heroHeight,
          opacity: heroOpacity,
          transform: [{ scale: heroScale }],
        },
      ]}
    >
      <ImageBackground source={{ uri: banners[bannerIndex] }} style={styles.heroBg} resizeMode="cover">
        <View style={styles.heroOverlay} />
        <View style={styles.bannerDots}>
          {banners.map((_, i) => (
            <View key={i} style={[styles.dot, i === bannerIndex && styles.dotActive]} />
          ))}
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  hero: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  heroBg: { flex: 1 },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: C.overlay,
  },
  bannerDots: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "center",
    gap: 5,
    bottom: 80,
  },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: "#FFFFFF66" },
  dotActive: { width: 16, backgroundColor: C.white },
});