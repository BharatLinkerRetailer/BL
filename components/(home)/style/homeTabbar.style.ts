// styles (FooterTabBar.styles.ts  — or paste inline above)
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFFFFF",
  },
  container: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 10,
    paddingBottom: 4,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    gap: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: "400",
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 2,
  },
  labelActive: {
    fontWeight: "700",
    color: "#374151",
  },
  homeIndicatorWrapper: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 4,
  },
  homeIndicator: {
    width: 120,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#9CA3AF",
  },
});