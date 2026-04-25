import { StyleSheet } from "react-native";
export const categoryPillsStyle = StyleSheet.create({
  
  categoryList: { paddingHorizontal: 16, paddingBottom: 20, gap: 8 },
  pillsContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 99,
    backgroundColor: "#d9f5db",
    borderColor: "black",
    marginTop: 2,
    paddingTop: 9,
    paddingBottom: 5,
    borderBottomColor: "black",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#42414129",
    backgroundColor: "#ffffff",
    
  },
  pillActive: {
    backgroundColor: "#222831",
    borderWidth: 1,
    borderColor: "#000000f3",
    
  },
  pillText: { fontSize: 15, fontWeight: 400},
  pillTextActive: {color:"white",fontWeight: 600 },

  bannerList: { paddingHorizontal: 13, gap: 12 },
  bannerCard: {
    height: 130,
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    marginRight: 4,
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

  //stats strip
  statsStrip: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    shadowOpacity: 0.05,
    borderWidth: 0.5,
    borderColor: "#0000002a",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 3,
    borderRightWidth: 1,
    borderRightColor: "#F0F0F0",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A1A1A",
    marginTop: 2,
  },
  statLabel: { fontSize: 11, color: "#888" },
});