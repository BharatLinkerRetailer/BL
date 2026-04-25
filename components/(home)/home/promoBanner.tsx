// ─── components/(home)/home/PromoBanner.tsx ────────────────────────────────

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Clipboard,
  Platform,
} from "react-native";

const COUPON = "FIRST50";

export default function PromoBanner(): React.JSX.Element {
  const copyCode = () => {
    if (Platform.OS !== "web") Clipboard.setString(COUPON);
  };

  return (
    <View style={styles.card}>
      {/* Decorative blobs */}
      <View style={styles.blobTL} />
      <View style={styles.blobBR} />

      <View style={styles.textBlock}>
        <Text style={styles.eyebrow}>LIMITED TIME</Text>
        <Text style={styles.heading}>Get ₹50 Off{"\n"}Your First Order</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={copyCode} style={styles.codeWrap}>
          <Text style={styles.codeLabel}>Use Code:</Text>
          <View style={styles.code}>
            <Text style={styles.codeText}>{COUPON}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.emoji}>🎉</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop:        20,
    borderRadius:     20,
    backgroundColor:  "#0f1a35",
    padding:          20,
    flexDirection:    "row",
    alignItems:       "center",
    justifyContent:   "space-between",
    overflow:         "hidden",
  },
  blobTL: {
    position: "absolute", top: -20, left: -20,
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: "rgba(76,201,240,0.12)",
  },
  blobBR: {
    position: "absolute", bottom: -30, right: 50,
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: "rgba(255,107,53,0.1)",
  },
  textBlock: { flex: 1 },
  eyebrow:   { color: "#4CC9F0", fontSize: 10, fontWeight: "700", letterSpacing: 1.2 },
  heading:   { color: "#fff", fontSize: 18, fontWeight: "800", marginTop: 6, lineHeight: 24 },
  codeWrap:  { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 14 },
  codeLabel: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  code:      {
    backgroundColor: "rgba(76,201,240,0.18)",
    borderWidth: 1, borderColor: "#4CC9F0",
    paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8,
    borderStyle: "dashed",
  },
  codeText:  { color: "#4CC9F0", fontSize: 13, fontWeight: "800", letterSpacing: 1 },
  emoji:     { fontSize: 58, marginLeft: 8 },
});