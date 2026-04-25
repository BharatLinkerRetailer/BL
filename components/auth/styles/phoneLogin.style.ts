import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4f5e8",
  },

  // ── Products Area ─────────────────────────────────
  productsArea: {
    backgroundColor: "#d4f5e8",
    paddingTop: 14,
    paddingHorizontal: 8,
    paddingBottom: 18,
  },

  productsRow: {
    flexDirection: "row",
    marginBottom: 8,
    gap: 8,
  },

  productCard: {
    width: 82,
    height: 82,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  productEmoji: {
    fontSize: 38,
  },

  // ── Main Content ──────────────────────────────────
  mainContent: {
    alignItems: "center",
    paddingHorizontal: 20,
  },

  // ── Blinkit Logo ──────────────────────────────────
  blinkitLogo: {
    width: 72,
    height: 72,
    backgroundColor: "#f7d117",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
    marginBottom: 14,
    shadowColor: "#f7d117",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 6,
  },

  blinkitLogoText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1a1a1a",
    letterSpacing: -0.5,
  },

  tagline: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 20,
  },

  // ── Login Card ────────────────────────────────────
  loginCard: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#03ffc85a",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    gap: 14,
    backgroundColor: "#303030",
    shadowColor: "#03ffc8",
    shadowOffset: { width: 7, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 8,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
  },

  cardSubtitle: {
    fontSize: 12,
    color: "#f2f2f2ca",
    fontWeight: "600",
    textAlign: "center",
    marginTop: -6,
  },

  // ── Phone Input ───────────────────────────────────
  phoneInputWrapper: {
    width: "100%",
    height: 52,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "#fafafa",
  },

  countryCode: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a1a",
    marginRight: 8,
  },

  dividerVertical: {
    width: 1,
    height: 22,
    backgroundColor: "#e0e0e0",
    marginRight: 10,
  },

  phoneInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "100",
    color: "#1a1a1a",
    height: "100%"
  },

  // ── Send OTP Button ───────────────────────────────
  sendBtn: {
    width: "100%",
    height: 52,
    backgroundColor: "#e23744",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#e23744",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },

  btnDisabled: {
    backgroundColor: "#f0d105",
    shadowOpacity: 0,
    elevation: 0,
  },

  btnText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.3,
  },

  autofillNote: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    fontWeight: "600",
  },

  // ── Terms ─────────────────────────────────────────
  terms: {
    fontSize: 11,
    color: "#000000",
    textAlign: "center",
    fontWeight: "600",
    marginTop: 10,
  },

  termsLink: {
    color: "#000000",
    fontWeight:800,
    textDecorationLine: "underline",
  },
});


















export const phoneLoginStyles = StyleSheet.create({
  // ===== CONTAINER =====
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  // ===== HEADER =====
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },

  // ===== INPUT GROUP =====
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },

  // ===== PHONE INPUT =====
  phoneInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#004E89",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
  countryCode: {
    fontSize: 14,
    fontWeight: "600",
    paddingLeft: 15,
    paddingRight: 10,
    color: "#000",
  },
  phoneInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: "#000",
  },

  // ===== OTP INPUT =====
  otpInput: {
    borderWidth: 2,
    borderColor: "#004E89",
    borderRadius: 10,
    padding: 20,
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    backgroundColor: "#f9f9f9",
    letterSpacing: 8,
    marginBottom: 10,
  },

  // ===== HELPER TEXT =====
  hint: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },

  // ===== BUTTONS =====
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  sendBtn: {
    backgroundColor: "#004E89",
  },
  verifyBtn: {
    backgroundColor: "#22c55e",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // ===== RESEND SECTION =====
  resendContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  timerText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  resendLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  resendBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#004E89",
  },
  resendText: {
    color: "#004E89",
    fontWeight: "600",
    fontSize: 14,
  },

  // ===== CHANGE PHONE =====
  changePhoneBtn: {
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 25,
  },
  changePhoneText: {
    color: "#999",
    fontSize: 14,
    textDecorationLine: "underline",
  },

  // ===== INFO BOX =====
  infoBox: {
    backgroundColor: "#f0f4f8",
    borderRadius: 10,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#004E89",
  },
  infoText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },

  
  // ===== USER BOX =====
  userBox: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#eee",
  },
  userLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: "600",
    marginBottom: 5,
  },
  userValue: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
});