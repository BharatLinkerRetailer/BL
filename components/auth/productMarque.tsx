import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Easing,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from 'react-native';

const PRODUCTS = [
  ["👶", "🫘", "🍫", "🍓", "🍦", "🫙", "🥣"],
  ["🥦", "☕", "🥄", "🥬", "🥐", "🧁", "🥛"],
  ["🍫", "🫘", "👶", "🥣", "🍦", "🍓", "🫙"],
  ["👶", "🫘", "🍫", "🍓", "🍦", "🫙", "🥣"],
  ["🍫", "🫘", "👶", "🥣", "🍦", "🍓", "🫙"],
  ["👶", "🫘", "🍫", "🍓", "🍦", "🫙", "🥣"],
  ["👶", "🫘", "🍫", "🍓", "🍦", "🫙", "🥣"],
  ["🥦", "☕", "🥄", "🥬", "🥐", "🧁", "🥛"],
  ["🍫", "🫘", "👶", "🥣", "🍦", "🍓", "🫙"],
  ["👶", "🫘", "🍫", "🍓", "🍦", "🫙", "🥣"],
  ["🍫", "🫘", "👶", "🥣", "🍦", "🍓", "🫙"],
];


const CARD_SIZE = 100;
const CARD_GAP = 12;
const CARD_STEP = CARD_SIZE + CARD_GAP;

// ✅ Now matches 4 rows
const DIRECTIONS: (1 | -1)[] = [1, -1, 1, -1,1, -1, 1, -1,1, -1, 1];
const SPEEDS = [30, 38, 34, 42,30, 38, 34, 42,30, 38, 34];

function MarqueeRow({
  emojis,
  direction,
  speed = 35,
}: {
  emojis: string[];
  direction: 1 | -1;
  speed?: number;
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const totalWidth = emojis.length * CARD_STEP;

  useEffect(() => {
    const startValue = direction === 1 ? 0 : -totalWidth;
    const endValue = direction === 1 ? -totalWidth : 0;

    translateX.setValue(startValue);

    const anim = Animated.loop(
      Animated.timing(translateX, {
        toValue: endValue,
        duration: (totalWidth / speed) * 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    anim.start();
    return () => anim.stop();
  }, []);

  const doubled = [...emojis, ...emojis];

  return (
    <View
      style={{
        height: CARD_SIZE,
        overflow: "hidden",
        marginBottom: CARD_GAP,
        zIndex:-9
      }}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          transform: [{ translateX }],
          gap: CARD_GAP,
        }}
      >
        {doubled.map((emoji, i) => (
          <View
            key={i}
            style={{
              width: CARD_SIZE,
              height: CARD_SIZE,
              backgroundColor: "rgb(255, 255, 255)",
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 38 }}>{emoji}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

export function ProductsMarquee() {

  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get('window');

  return (
    <View
      style={{
        paddingTop: 14,
        paddingBottom: 10,
        overflow: "hidden",
        zIndex:-900,
        position:"absolute",
        top:insets.top,
        marginBottom:insets.bottom,
        height:height/2
      }}
    >
      {PRODUCTS.map((row, i) => (
        <MarqueeRow
          key={i}
          emojis={row}
          direction={DIRECTIONS[i]}
          speed={SPEEDS[i]}
        />
      ))}

      {/* ── Top fade ── */}
      <LinearGradient
        colors={["#d4f5e8", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          zIndex: 10,
        }}
        pointerEvents="none"
      />

      {/* ── Bottom fade ── */}
      <LinearGradient
        colors={["transparent", "#d8f6e1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 90,
          zIndex: 10,
        }}
        pointerEvents="none"
      />
      <LinearGradient
        colors={["transparent", "#d8f6e1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 90,
          zIndex: 10,
        }}
        pointerEvents="none"
      />
    </View>
  );
}