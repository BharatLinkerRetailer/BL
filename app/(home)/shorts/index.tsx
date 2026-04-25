import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  View,
  Text,
  Dimensions,
  Easing,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";

import { StatusBar } from "react-native";
const { width: W, height: H } = Dimensions.get("window");

// ─── Themes ───────────────────────────────────────────────────────────────────
const LIGHT = {
  bg:           "#ffffff",
  surface:      "#FFFFFF",
  surfaceAlt:   "#EEF0F3",
  green:        "#258e389b",
  greenGlow:    "#0C831F22",
  greenPale:    "#0C831F12",
  greenBorder:  "#0C831F30",
  accent:       "#C9950A",
  accentBg:     "#F8CB2E18",
  accentBorder: "#F8CB2E40",
  text:         "#0F1115",
  textSub:      "#6B7280",
  muted:        "#9AA0AB",
  border:       "#E2E5EA",
};

const DARK = {
  bg:           "#0A0A0A",
  surface:      "#141414",
  surfaceAlt:   "#1C1C1C",
  green:        "#12A829",
  greenGlow:    "#17C43580",
  greenPale:    "#0C831F18",
  greenBorder:  "#0C831F40",
  accent:       "#F8CB2E",
  accentBg:     "#F8CB2E10",
  accentBorder: "#F8CB2E30",
  text:         "#F0F0F0",
  textSub:      "#A0A0A0",
  muted:        "#505050",
  border:       "#222222",
};

type Theme = typeof LIGHT;

// ─── Ring ─────────────────────────────────────────────────────────────────────
function Ring({ size, opacity, delay, style, theme }: {
  size: number; opacity: number; delay: number; style?: object; theme: Theme;
}) {
  const pulse = useRef(new Animated.Value(0.85)).current;
  const fade  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(fade, { toValue: opacity, duration: 800, useNativeDriver: true }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulse, { toValue: 1.08, duration: 2800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
            Animated.timing(pulse, { toValue: 0.85, duration: 2800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          ])
        ),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View style={[{
      width: size, height: size, borderRadius: size / 2,
      borderWidth: 1, borderColor: theme.green,
      position: "absolute", opacity: fade,
      transform: [{ scale: pulse }],
    }, style]} />
  );
}

// ─── Dot ──────────────────────────────────────────────────────────────────────
function Dot({ x, y, delay, theme }: { x: number; y: number; delay: number; theme: Theme }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: 1, duration: 1400, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 1400, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });
  return (
    <Animated.View style={{
      position: "absolute", left: x, top: y,
      width: 4, height: 4, borderRadius: 2,
      backgroundColor: theme.green,
      opacity: anim, transform: [{ translateY }],
    }} />
  );
}

// ─── GlowIcon ─────────────────────────────────────────────────────────────────
function GlowIcon({ theme }: { theme: Theme }) {
  const glow   = useRef(new Animated.Value(0)).current;
  const scale  = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale,  { toValue: 1, delay: 400, useNativeDriver: true, bounciness: 16 }).start();
    Animated.loop(Animated.timing(rotate, { toValue: 1, duration: 8000, easing: Easing.linear, useNativeDriver: true })).start();
    Animated.loop(Animated.sequence([
      Animated.timing(glow, { toValue: 1,   duration: 1600, useNativeDriver: true }),
      Animated.timing(glow, { toValue: 0.4, duration: 1600, useNativeDriver: true }),
    ])).start();
  }, []);

  const glowOpacity = glow.interpolate({ inputRange: [0, 1], outputRange: [0.18, 0.55] });
  const rotateDeg   = rotate.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <Animated.View style={{ transform: [{ scale }], alignItems: "center", justifyContent: "center" }}>
      <Animated.View style={{
        position: "absolute", width: 160, height: 160, borderRadius: 80,
        backgroundColor: theme.green, opacity: glowOpacity,
      }} />
      <Animated.View style={{
        position: "absolute", width: 120, height: 120,
        alignItems: "center", justifyContent: "center",
        transform: [{ rotate: rotateDeg }],
      }}>
        {[...Array(12)].map((_, i) => (
          <View key={i} style={{
            position: "absolute", width: 5, height: 5, borderRadius: 3,
            backgroundColor: theme.green,
            transform: [{ rotate: `${i * 30}deg` }, { translateY: -58 }],
            opacity: i % 2 === 0 ? 0.9 : 0.3,
          }} />
        ))}
      </Animated.View>
      <View style={{
        width: 96, height: 96, borderRadius: 48,
        backgroundColor: theme.greenPale,
        alignItems: "center", justifyContent: "center",
        borderWidth: 1.5, borderColor: theme.greenBorder,
      }}>
        <MaterialCommunityIcons name="play-circle" size={56} color={theme.green} />
      </View>
    </Animated.View>
  );
}

// ─── RevealText ───────────────────────────────────────────────────────────────
function RevealText({ children, delay, style }: { children: React.ReactNode; delay: number; style?: object }) {
  const opacity    = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity,    { toValue: 1, duration: 600, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 600, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <View style={style}>{children}</View>
    </Animated.View>
  );
}

// ─── FeaturePill ──────────────────────────────────────────────────────────────
function FeaturePill({ icon, label, delay, theme }: { icon: string; label: string; delay: number; theme: Theme }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale   = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 500, delay, useNativeDriver: true }),
      Animated.spring(scale,   { toValue: 1, delay, useNativeDriver: true, bounciness: 10 }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{
      opacity, transform: [{ scale }],
      flexDirection: "row", alignItems: "center", gap: 5,
      backgroundColor: theme.greenPale,
      borderWidth: 1, borderColor: theme.greenBorder,
      borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7,
    }}>
      <MaterialCommunityIcons name={icon as any} size={14} color={theme.green} />
      <Text style={{ fontSize: 11, fontWeight: "600", color: theme.text, letterSpacing: 0.2 }}>
        {label}
      </Text>
    </Animated.View>
  );
}



// ─── Main Content ─────────────────────────────────────────────────────────────
function ShortsContent({ isDark, theme, onToggle }: { isDark: boolean; theme: Theme; onToggle: () => void }) {
  
  const insets  = useSafeAreaInsets();
  const barAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(barAnim, { toValue: 1, duration: 2200, useNativeDriver: false }),
        Animated.timing(barAnim, { toValue: 0, duration: 600,  useNativeDriver: false }),
      ])
    ).start();
  }, []);

  const barWidth = barAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "78%"] });

  const dots = [
    { x: 28,    y: H * 0.18, delay: 0    },
    { x: W - 44, y: H * 0.22, delay: 400  },
    { x: 52,    y: H * 0.72, delay: 800  },
    { x: W - 36, y: H * 0.68, delay: 200  },
    { x: W / 2,  y: H * 0.12, delay: 600  },
    { x: 80,    y: H * 0.44, delay: 1000 },
    { x: W - 80, y: H * 0.46, delay: 300  },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, overflow: "hidden" }}>

      {/* Corner glows */}
      <View style={{
        position: "absolute", top: -60, right: -60,
        width: 220, height: 220, borderRadius: 110,
        backgroundColor: theme.greenGlow, opacity: isDark ? 0.35 : 0.7,
      }} />
      <View style={{
        position: "absolute", bottom: -80, left: -80,
        width: 260, height: 260, borderRadius: 130,
        backgroundColor: theme.greenGlow, opacity: isDark ? 0.2 : 0.5,
      }} />

      {/* Rings */}
      <Ring size={340} opacity={isDark ? 0.12 : 0.20} delay={0}   style={{ top: H * 0.28, left: W / 2 - 170 }} theme={theme} />
      <Ring size={480} opacity={isDark ? 0.07 : 0.12} delay={200} style={{ top: H * 0.21, left: W / 2 - 240 }} theme={theme} />
      <Ring size={600} opacity={isDark ? 0.04 : 0.07} delay={400} style={{ top: H * 0.14, left: W / 2 - 300 }} theme={theme} />

      {/* Floating dots */}
      {dots.map((d, i) => <Dot key={i} {...d} theme={theme} />)}

      {/* ── Top bar ── */}
      <View style={{
        paddingTop: insets.top + 8,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <View style={{
          flexDirection: "row", alignItems: "center", gap: 6,
          backgroundColor: theme.surface,
          borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5,
          borderWidth: 1, borderColor: theme.border,
        }}>
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: theme.green }} />
          <Text style={{ fontSize: 10, fontWeight: "800", color: theme.muted, letterSpacing: 3 }}>
            SHORTS
          </Text>
        </View>
        
      </View>

      {/* ── Center ── */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 28 }}>

        <View style={{ marginBottom: 28 }}>
          <GlowIcon theme={theme} />
        </View>

        <RevealText delay={300} style={{ alignItems: "center" }}>
          <Text style={{
            fontSize: 60, fontWeight: "900",
            color: theme.text, textAlign: "center",
            letterSpacing: -2.5, lineHeight: 62, marginBottom: 12,
          }}>
            Coming{"\n"}Soon
          </Text>
        </RevealText>

        <RevealText delay={500} style={{ alignItems: "center" }}>
          <Text style={{
            fontSize: 13, color: theme.textSub,
            textAlign: "center", letterSpacing: 0.3,
            marginBottom: 28, lineHeight: 20,
          }}>
            Flash deals · Viral picks · Instant delivery
          </Text>
        </RevealText>

        <RevealText delay={700} style={{ alignItems: "center", width: W * 0.6 }}>
          <View style={{
            width: "100%", height: 3,
            backgroundColor: theme.border,
            borderRadius: 4, overflow: "hidden", marginBottom: 8,
          }}>
            <Animated.View style={{
              height: "100%", width: barWidth,
              backgroundColor: theme.green, borderRadius: 4,
            }} />
          </View>
          <Text style={{ fontSize: 10.5, color: theme.muted, letterSpacing: 0.5 }}>
            Cooking something special…
          </Text>
        </RevealText>

        <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 28 }}>
          <FeaturePill icon="lightning-bolt" label="Flash Sales"     delay={900}  theme={theme} />
          <FeaturePill icon="video-outline"  label="Video Reviews"   delay={1050} theme={theme} />
          <FeaturePill icon="tag-multiple"   label="Exclusive Deals" delay={1200} theme={theme} />
        </View>
      </View>

      {/* ── Footer ── */}
      <RevealText delay={1400} style={{ alignItems: "center" }}>
        <View style={{
          flexDirection: "row", alignItems: "center", gap: 6,
          borderWidth: 1, borderColor: theme.accentBorder,
          backgroundColor: theme.accentBg,
          borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8,
          marginBottom: insets.bottom + 28,
        }}>
          {/* <AntDesign name="bells" size={13} color={theme.accent} /> */}
          <Text style={{ fontSize: 11.5, fontWeight: "600", color: theme.accent, letterSpacing: 0.2 }}>
            Stay tuned — it's worth the wait
          </Text>
        </View>
      </RevealText>

    </View>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Shorts() {
  const systemScheme = useColorScheme();
  // Default: light mode. Follows system on first render, then user can override.
  const [isDark, setIsDark] = useState(systemScheme === "dark");

  const theme = LIGHT;

  const isFocused = useIsFocused();
  return (
    <SafeAreaProvider>
      
            {isFocused && <StatusBar barStyle={"dark-content"} />}
      <ShortsContent
        isDark={isDark}
        theme={theme}
        onToggle={() => setIsDark(p => !p)}
      />
    </SafeAreaProvider>
  );
}