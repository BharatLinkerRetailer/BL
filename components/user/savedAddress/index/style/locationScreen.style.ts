// styles/locationStyles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 24,   // breathing room at the bottom
  },


  // HEADER
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },
  backBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    elevation: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
  },


  // CARD
  card: {
    backgroundColor: "white",
    shadowColor: "#00000063",
    borderRadius: 12,
    marginBottom: 15,
    paddingVertical: 5,
    elevation: 2,

  },

  // ROW
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ff2d55",
  },
  subtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  enableBtn: {
    borderWidth: 1,
    borderColor: "#ff2d55",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  // in locationScreen.style.ts
enableBtnDisabled: {
  backgroundColor: "#ffb3be", // ✅ washed out red when disabled
  opacity: 0.7,
},
  enableText: {
    color: "#ff2d55",
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 15,
  },
});