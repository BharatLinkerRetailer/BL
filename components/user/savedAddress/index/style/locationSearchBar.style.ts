// styles/locationStyles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // SEARCH
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 20,
    elevation: 1,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
  },
suggestionsContainer: {
  backgroundColor: "white",
  marginHorizontal: 16,
  borderRadius: 12,
  elevation: 4,
  shadowColor: "#00000031",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  marginBottom: 30,
  maxHeight: 212,        // ✅ on View, not ScrollView
},
  suggestionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 90
  },
  suggestionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  suggestionText: {
    flex: 1,
    fontSize: 13,
    color: "#1e293b",
    lineHeight: 18,
  },
});
