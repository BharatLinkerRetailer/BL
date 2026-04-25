import { StyleSheet, Platform, Dimensions } from "react-native";


const { width } = Dimensions.get("window");

export const PINK = "#E91E8C";
export const HEADER_HEIGHT = Platform.OS === "ios" ? 100 : 70;
export const CARD_HEIGHT = 200;

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffffe6" },
  header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  paddingBottom: 12,
  backgroundColor: "#ffffff",
  zIndex: 10,
  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
},
  backBtn: {backgroundColor:"#fff", width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#000000" },
  map: { flex: 1 },

  // Fixed center pin
  fixedPinContainer: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    bottom: CARD_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  pinIconWrapper: { alignItems: "center" },
  pinShadow: {
    position: "absolute",
    bottom: 4, alignSelf: "center",
    width: 12, height: 6, borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  pinShadowExpanded: {
    width: 8, height: 4,
    backgroundColor: "rgba(0,0,0,0.15)",
  },

  // Tooltip
  tooltipWrapper: {
    position: "absolute",
    alignSelf: "center", alignItems: "center",
  },
  tooltip: {
    backgroundColor: "rgba(15,15,15,0.88)", borderRadius: 10,
    paddingVertical: 10, paddingHorizontal: 16, maxWidth: width * 0.75,
  },
  tooltipTitle: { color: "#fff", fontWeight: "700", fontSize: 14, marginBottom: 2 },
  tooltipSub: { color: "#ddd", fontSize: 12 },
  tooltipArrow: {
    width: 0, height: 0, borderLeftWidth: 8, borderRightWidth: 8, borderTopWidth: 10,
    borderLeftColor: "transparent", borderRightColor: "transparent",
    borderTopColor: "rgba(15,15,15,0.88)",
  },

  // FAB
  myLocationBtn: {
    position: "absolute", bottom: CARD_HEIGHT + 16, right: 12,
    width: 50, height: 50, borderRadius: 25, backgroundColor: "#fff",
    alignItems: "center", justifyContent: "center",
    elevation: 4, shadowColor: "#000", shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 }, shadowRadius: 4,
  },

  // Bottom card
  card: {
    backgroundColor: "#000000", borderTopLeftRadius: 20, borderTopRightRadius: 20,
    paddingHorizontal: 20, paddingTop: 22,
    paddingBottom: Platform.OS === "ios" ? 36 : 24,
    elevation: 16, shadowColor: "#000", shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: -4 }, shadowRadius: 12,
    borderColor:"black"
  },
  addressRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 6 },
  geocodingRow: { flexDirection: "row", alignItems: "center", paddingVertical: 4 },
  geocodingText: { fontSize: 14, color: "#999" },
  addressMain: { fontSize: 20, fontWeight: "700", color: "#ffffff", marginBottom: 2 },
  addressSub: { fontSize: 13, color: "#777" },
  warningRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  distanceWarning: { fontSize: 12, color: PINK },
  confirmBtn: {
    backgroundColor: PINK, borderRadius: 12, paddingVertical: 16,
    alignItems: "center", marginTop: 12,
  },
  confirmBtnDisabled: { backgroundColor: "#f0a0c8" },
  confirmText: { color: "#fff", fontSize: 16, fontWeight: "700" },


  //dragging
  draggingBanner: {
  position: "absolute",
  top: HEADER_HEIGHT + 16,
  alignSelf: "center",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#333",
  borderRadius: 20,
  paddingVertical: 8,
  paddingHorizontal: 16,
},
draggingText: { color: "#fff", fontSize: 13, fontWeight: "600" },

recenterBtn: {
  position: "absolute", top: HEADER_HEIGHT - 12, right: 12,
  width: 44, height: 44, borderRadius: 22, backgroundColor: "#fff",
  alignItems: "center", justifyContent: "center",
  elevation: 4, shadowColor: "#000", shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 2 }, shadowRadius: 4,
},
});