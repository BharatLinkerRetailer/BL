import { StyleSheet } from "react-native";
// ─── Styles ───────────────────────────────────────────────────────────────────────
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#F3F4F6",
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: 0.2,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  // Add New Row
  addNewRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  addNewLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  plusIcon: {
    fontSize: 22,
    color: "#E91E8C",
    fontWeight: "600",
    marginRight: 10,
    lineHeight: 24,
  },
  addNewText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E91E8C",
  },

  // Section Title
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 14,
    letterSpacing: 0.1,
  },

  // Card
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    marginRight: 8,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 3,
  },
  cardAddress: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionBtn: {
    padding: 4,
  },

  // Shared
  iconText: {
    fontSize: 20,
    color: "#374151",
  },
});
