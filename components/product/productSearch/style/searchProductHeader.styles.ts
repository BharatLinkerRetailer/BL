import { StyleSheet } from "react-native";

const h="#021526"
export const searchProductHeaderStyle = StyleSheet.create({
  inset: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: h,
    zIndex: 101,
  },
  container: {
    position: "absolute", // ← floats over scroll content
    top: 0,
    left: 0,
    right: 0,
    backgroundColor:h,
    paddingHorizontal: 16,
    paddingBottom: 9,
    paddingTop: 50,
    zIndex: 100,
    color:"white"
  },

  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    
  },

  deliveryText: {
    fontSize: 14,
    color:"white"
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  time: {
    fontSize: 26,
    fontWeight: "bold",
    marginRight: 8,
    color:"white"
  },

  badge: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    borderRadius: 10,
  },

  badgeText: {
    fontSize: 12,
  },

  address: {
    marginTop: 3,
    fontSize: 13,
    color:"white"
  },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    color:"white"
  },

    cart: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 8,
  },
  userIcon: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 8,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 12,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    color:"black"
    
  },

  input: {
    flex: 1,
    marginLeft: 8,
    color:"grey",
    
  }
  ,

  categoryScroll: {
    marginTop: 12
  },

  categoryItem: {
    marginRight: 18,
    alignItems: "center",
  },

  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
