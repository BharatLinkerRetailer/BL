import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles/phoneLogin.style";
import { ProductsMarquee } from "./productMarque";
import auth from "@react-native-firebase/auth";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export const PhoneLoginScreen: React.FC = (): React.ReactElement => {
  const insets = useSafeAreaInsets();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    try {
      setLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(`+91${phoneNumber}`);
      setConfirm(confirmation);
    } catch (error) {
      console.error("OTP send error:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      await confirm?.confirm(otp);
      // onAuthStateChanged in parent fires automatically
    } catch (error) {
      console.error("OTP verify error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ProductsMarquee />

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#d4f5e8bb" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={[
            styles.mainContent,
            { marginTop: 3.5 * insets.top },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Logo ── */}
          <View style={styles.blinkitLogo}>
            <Text style={styles.blinkitLogoText}>BL</Text>
          </View>

          <Text style={styles.tagline}>India's last minute app</Text>

          <View style={styles.loginCard}>
            {!confirm ? (
              // ── Step 1: Phone Number ──
              <>
                <Text style={styles.cardTitle}>Enter your phone number</Text>
                <Text style={styles.cardSubtitle}>
                  We'll send an OTP to verify your number
                </Text>

                {/* Phone input with +91 prefix */}
                <View style={styles.phoneInputWrapper}>
                  <Text style={styles.countryCode}>+91</Text>
                  <View style={styles.dividerVertical} />
                  <TextInput
                    style={styles.phoneInput}
                    placeholder="XXXXX XXXXX"
                    placeholderTextColor="#aaa"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    maxLength={10}
                  />
                </View>

                <TouchableOpacity
                  onPress={sendOtp}
                  disabled={loading || phoneNumber.length < 10}
                  style={[
                    styles.sendBtn,
                    (loading || phoneNumber.length < 10) && styles.btnDisabled,
                  ]}
                  activeOpacity={0.85}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.btnText}>Send OTP</Text>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              // ── Step 2: OTP ──
              <>
                <Text style={styles.cardTitle}>Enter OTP</Text>
                <Text style={styles.cardSubtitle}>
                  OTP sent to +91 {phoneNumber}
                </Text>

                <View style={styles.phoneInputWrapper}>
                  <TextInput
                    style={[styles.phoneInput, { letterSpacing: 8, fontWeight: "700" }]}
                    placeholder="• • • • • •"
                    placeholderTextColor="#aaa"
                    keyboardType="number-pad"
                    value={otp}
                    onChangeText={setOtp}
                    maxLength={6}
                  />
                </View>

                <TouchableOpacity
                  onPress={verifyOtp}
                  disabled={loading || otp.length < 6}
                  style={[
                    styles.sendBtn,
                    (loading || otp.length < 6) && styles.btnDisabled,
                  ]}
                  activeOpacity={0.85}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.btnText}>Verify OTP</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => { setConfirm(null); setOtp(""); }}
                  style={{ marginTop: 4, alignItems: "center" }}
                >
                  <Text style={styles.autofillNote}>
                    Change phone number
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <Text style={styles.terms}>
            By continuing, you agree to our{" "}
            <Text style={styles.termsLink}>Terms of service</Text>
            {" & "}
            <Text style={styles.termsLink}>Privacy policy</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default PhoneLoginScreen;