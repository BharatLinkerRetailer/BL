import { StyleSheet } from "react-native";
export const bannerCarousalStyle = StyleSheet.create({
  
bannerList: { paddingHorizontal: 13, gap: 12 },
  bannerCard: {
    height: 130,
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    marginRight: 4,
    marginBottom:20
  },
  bannerTitle: { fontSize: 17, fontWeight: "800", letterSpacing: -0.4 },
  bannerSub: { fontSize: 12, color: "#555", marginTop: 3, marginBottom: 12 },
  bannerBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  bannerBtnText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  bannerEmoji: { fontSize: 52, marginLeft: 12 },

});


