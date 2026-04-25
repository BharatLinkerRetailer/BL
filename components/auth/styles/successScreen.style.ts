import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#0a0f1e",
    alignItems: "center",
    justifyContent: "center",
  },

  // Glow background effect
  glowOuter: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "#1a73e820",
    alignItems: "center",
    justifyContent: "center",
  },
  glowInner: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#1a73e815",
  },

  // Card
  card: {
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 48,
    backgroundColor: "#111827",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#1e293b",
    width: "85%",
    shadowColor: "#1a73e8",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 20,
  },

  // Spinner
  loaderWrapper: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  spinnerRing: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "transparent",
    borderTopColor: "#1a73e8",
    borderRightColor: "#1a73e840",
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#1a73e815",
    borderWidth: 2,
    borderColor: "#1a73e8",
    alignItems: "center",
    justifyContent: "center",
  },
  checkMark: {
    fontSize: 28,
    color: "#1a73e8",
    fontWeight: "700",
  },

  // Text
  successTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  successSubtitle: {
    fontSize: 15,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 4,
  },
  phoneText: {
    fontSize: 13,
    color: "#1a73e8",
    textAlign: "center",
    marginBottom: 32,
    letterSpacing: 0.5,
  },

  // Progress
  progressTrack: {
    width: "100%",
    height: 3,
    backgroundColor: "#1e293b",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressBar: {
    height: 3,
    backgroundColor: "#1a73e8",
    borderRadius: 2,
  },
  redirectText: {
    fontSize: 12,
    color: "#475569",
    textAlign: "center",
  }
});