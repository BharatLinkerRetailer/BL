import React from "react";
import { TouchableOpacity, StyleSheet, Animated, Share } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../infoConstant";

type Props = {
  shopId: string;
  insetsTop: number;
  headerBg: any;
  titleOpacity: any;
  shopName: string;
  onBack: () => void;
};

export default function ShopTopBar({
  shopId,
  insetsTop,
  headerBg,
  titleOpacity,
  shopName,
  onBack,
}: Props) {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${shopName ?? "this shop"} on BharatLinker!\nbl:///(shop)/info/index?shopId=${shopId}`,
      });
    } catch (err) {
      console.error("Share failed:", err);
    }
  };
  return (
    <Animated.View
      style={[
        styles.topBar,
        { paddingTop: insetsTop + 8, backgroundColor: headerBg },
      ]}
    >
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Ionicons name="chevron-back" size={20} color={C.white} />
      </TouchableOpacity>

      <Animated.Text
        style={[styles.topBarTitle, { opacity: titleOpacity }]}
        numberOfLines={1}
      >
        {shopName}
      </Animated.Text>

      <TouchableOpacity style={styles.backBtn} onPress={handleShare}>
        <Ionicons name="share-outline" size={20} color={C.white} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
    zIndex: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#00000033",
    alignItems: "center",
    justifyContent: "center",
  },
  topBarTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
    color: C.white,
    marginHorizontal: 8,
  },
});
