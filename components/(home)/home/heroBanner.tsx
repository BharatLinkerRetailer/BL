// components/(home)/home/HeroBanner.tsx
import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// ─── Types ────────────────────────────────────────────────────────────────────
interface BannerItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  gradient: readonly [string, string, string];
  accentColor: string;
  barColor: string;
  emoji: string;
  ctaTextColor: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const BANNERS: BannerItem[] = [
  {
    id: "empower",
    tag: "WELCOME TO THE FUTURE",
    title: "Empower Your\nLocal Shop",
    subtitle: "Go digital and compete with big e-commerce",
    gradient: ["#064E3B", "#065F46", "#047857"],
    accentColor: "#6EE7B7",
    barColor:"#0a906a",
    emoji: "🏪",
    ctaTextColor: "#064E3B",
  },
  {
    id: "grow",
    tag: "GROW FASTER",
    title: "More Customers,\nMore Revenue",
    subtitle: "Reach thousands of buyers in your city instantly",
    gradient: ["#7C2D12", "#C2410C", "#F97316"],
    accentColor: "#FED7AA",
    barColor: "#F97316",
    emoji: "🚀",
    ctaTextColor: "#7C2D12",
  },
  {
    id: "fight",
    tag: "LOCAL HEROES",
    title: "Beat Big\nE-commerce",
    subtitle: "Smart digital tools built for small businesses",
    gradient: ["#1E1B4B", "#3730A3", "#4F46E5"],
    accentColor: "#C7D2FE",
    barColor: "#4F46E5",
    emoji: "⚡",
    ctaTextColor: "#1E1B4B",
  },
  {
    id: "trust",
    tag: "WHY CHOOSE US",
    title: "Built for\nIndia's Retailers",
    subtitle: "Zero commission · Fast delivery · Full control",
    gradient: ["#7F1D1D", "#B91C1C", "#DC2626"],
    accentColor: "#FECACA",
    barColor: "#DC2626",
    emoji: "🇮🇳",
    ctaTextColor: "#7F1D1D",
  },
];

// ─── Dimensions ───────────────────────────────────────────────────────────────
const { width: SW } = Dimensions.get("window");
const CARD_WIDTH = SW - 40;
const CARD_HEIGHT = 190;
const SNAP_INTERVAL = CARD_WIDTH + 14;

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HeroBanner(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<BannerItem>>(null);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset.x;
      setActiveIndex(Math.round(x / SNAP_INTERVAL));
    },
    []
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatListRef}
        data={BANNERS}
        keyExtractor={(b) => b.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <BannerCard banner={item} isActive={index === activeIndex} />
        )}
      />
      <PaginationBar total={BANNERS.length} active={activeIndex} />
    </View>
  );
}

// ─── Banner Card ──────────────────────────────────────────────────────────────
function BannerCard({
  banner,
  isActive,
}: {
  banner: BannerItem;
  isActive: boolean;
}) {
  const scaleAnim = useRef(new Animated.Value(isActive ? 1 : 0.96)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Scale up when active
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isActive ? 1 : 0.96,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
  }, [isActive]);

  // Subtle glow pulse on the accent circle
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.12, 0.28],
  });

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}>
      <LinearGradient
        colors={banner.gradient}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.card}
      >
        {/* ── Decorative Rings ── */}
        <Animated.View
          style={[
            styles.ring1,
            { borderColor: banner.accentColor, opacity: glowOpacity },
          ]}
        />
        <View
          style={[
            styles.ring2,
            { borderColor: banner.accentColor, opacity: 0.12 },
          ]}
        />

        {/* ── Accent Blobs ── */}
        <View style={[styles.blob1, { backgroundColor: banner.accentColor }]} />
        <View style={[styles.blob2, { backgroundColor: banner.accentColor }]} />

        {/* ── Large Emoji Watermark ── */}
        <Text style={styles.emojiWatermark}>{banner.emoji}</Text>

        {/* ── Card Content ── */}
        <View style={styles.content}>
          {/* Tag */}
          <View style={[styles.tagPill, { borderColor: `${banner.accentColor}60` }]}>
            <View style={[styles.tagDot, { backgroundColor: banner.accentColor }]} />
            <Text style={[styles.tagText, { color: banner.accentColor }]}>
              {banner.tag}
            </Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{banner.title}</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>{banner.subtitle}</Text>

          {/* CTA */}
          <TouchableOpacity
            style={[styles.cta, { backgroundColor: banner.accentColor }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.ctaText, { color: banner.ctaTextColor }]}>
              Get Started
            </Text>
            <View style={[styles.ctaArrow, { backgroundColor: `${banner.ctaTextColor}15` }]}>
              <Text style={[styles.ctaArrowText, { color: banner.ctaTextColor }]}>→</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function PaginationBar({ total, active }: { total: number; active: number }) {
  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} isActive={i === active} barColor={BANNERS[active].barColor} />
      ))}
    </View>
  );
}

function Dot({ isActive, barColor }: { isActive: boolean; barColor: string }) {
  const widthAnim = useRef(new Animated.Value(isActive ? 28 : 7)).current;
  const opacityAnim = useRef(new Animated.Value(isActive ? 1 : 0.35)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(widthAnim, {
        toValue: isActive ? 28 : 7,
        useNativeDriver: false,
        tension: 100,
        friction: 12,
      }),
      Animated.timing(opacityAnim, {
        toValue: isActive ? 1 : 0.35,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isActive]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          width: widthAnim,
          backgroundColor: barColor,
          opacity: opacityAnim,
        },
      ]}
    />
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 12,
  },
  listContent: {
    paddingHorizontal: 20,
    gap: 14,
  },

  // Card
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 28,
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
    overflow: "hidden",
    position: "relative",
  },

  // Decorative rings
  ring1: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1.5,
    top: -70,
    right: -55,
  },
  ring2: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    top: -30,
    right: 10,
  },

  // Blobs
  blob1: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    bottom: -30,
    right: -20,
    opacity: 0.18,
  },
  blob2: {
    position: "absolute",
    width: 55,
    height: 55,
    borderRadius: 28,
    bottom: 30,
    right: 55,
    opacity: 0.1,
  },

  // Emoji watermark
  emojiWatermark: {
    position: "absolute",
    fontSize: 72,
    top: 18,
    right: 22,
    opacity: 0.22,
  },

  // Content layout
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: "space-between",
  },

  // Tag pill
  tagPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 5,
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  tagDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
  },

  // Title
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 34,
    letterSpacing: -0.5,
    marginTop: 1,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // Subtitle
  subtitle: {
    fontSize: 13.5,
    color: "rgba(255,255,255,0.72)",
    lineHeight: 20,
    fontWeight: "400",
    letterSpacing: 0.5,
  },

  // CTA button
  cta: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 14,
    paddingLeft: 18,
    paddingRight: 6,
    paddingVertical: 5,
    marginTop:9,
    gap: 8,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  ctaArrow: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaArrowText: {
    fontSize: 14,
    fontWeight: "800",
  },

  // Pagination dots
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
    gap: 6,
  },
  dot: {
    height: 7,
    borderRadius: 4,
  },
});