import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles, COLORS } from "./style/addressScreenForm.style";
import { AddressForm, AddressLabel } from "../types";

import auth from "@react-native-firebase/auth";

import FormField from "./formField";
import PhoneField from "./phoneField";
import LabelChip from "./labelChip";

import { addAddress } from "../../../../firebase/user/address";
import { useAddressStore } from "../../../../store/user/address";
// ─── Constants ────────────────────────────────────────────────────────────────

const ADDRESS_LABELS: AddressLabel[] = ["Home", "Work", "Other"];

const INITIAL_FORM: AddressForm = {
  street: "",
  apartmentUnit: "",
  landmark: "",
  deliveryInstructions: "",
  label: "Home",
  receiverName: "",
  phoneNumber: "",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function IndexFormScreen() { 
  const { addAddress: addToStore } = useAddressStore();
  const user = auth().currentUser; // ✅
  const userId = user?.uid;

  const router = useRouter();
  const params = useLocalSearchParams<{
    lat: string;
    lon: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }>();

  const latitude = params.lat ? parseFloat(params.lat) : 0;
  const longitude = params.lon ? parseFloat(params.lon) : 0;
  const locationAddress = params.address ?? "Selected Location";

  // ── State ─────────────────────────────────────────────────────────────────
  const [form, setForm] = useState<AddressForm>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const updateField = useCallback(
    <K extends keyof AddressForm>(key: K, value: AddressForm[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const isValid =
    form.street.trim().length > 0 &&
    form.receiverName.trim().length > 0 &&
    form.phoneNumber.trim().length === 10;

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!isValid || !userId) return;

    setLoading(true);
    try {
      const newAddress = await addAddress(userId, {
        street: form.street.trim(),
        city: params.city ?? "",
        state: params.state ?? "",
        postalCode: params.postalCode ?? "",
        country: params.country ?? "India",
        latitude,
        longitude,
        apartmentUnit: form.apartmentUnit.trim() || "",
        landmark: form.landmark.trim() || "",
        deliveryInstructions: form.deliveryInstructions.trim() || "",
        label: form.label,
        phoneNumber: form.phoneNumber.trim(),
        isActive: true,
      });

      if (newAddress) {
        addToStore(newAddress);
      }

      router.replace("/user/savedAddress/savedAddressPage");
    } catch (err: any) {
      const isLimitError = err?.message?.includes("limit reached");
      Alert.alert(
        isLimitError ? "Address limit reached" : "Could not save address",
        isLimitError
          ? "You can store up to 5 addresses. Please delete one before adding a new one."
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => router.back();
  const handleChangeLocation = () => router.back();

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={18} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Delivery Address Details</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Location Bar */}
          <View style={styles.locationBar}>
            <View style={styles.locationInfo}>
              <View style={styles.locationIconWrap}>
                <Ionicons
                  name="location-sharp"
                  size={15}
                  color={COLORS.brand}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.locationName} numberOfLines={1}>
                  {locationAddress}
                </Text>
                {latitude !== 0 && longitude !== 0 && (
                  <Text style={styles.locationSub}>
                    {`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`}
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={handleChangeLocation}
              activeOpacity={0.7}
            >
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>

          {/* Address Section */}
          <View style={{ padding: 5 }}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Address</Text>
              <View style={styles.fieldGroup}>
                <FormField
                  label="House No. & Floor"
                  required
                  placeholder="e.g. 42, 3rd Floor"
                  value={form.street}
                  onChangeText={(v) => updateField("street", v)}
                  returnKeyType="next"
                />
                <FormField
                  label="Building & Block No."
                  optional
                  placeholder="e.g. Sunshine Apartments, Block B"
                  value={form.apartmentUnit}
                  onChangeText={(v) => updateField("apartmentUnit", v)}
                  returnKeyType="next"
                />
                <FormField
                  label="Landmark & Area Name"
                  optional
                  placeholder="e.g. Near City Mall"
                  value={form.landmark}
                  onChangeText={(v) => updateField("landmark", v)}
                  returnKeyType="next"
                />
                <FormField
                  label="Delivery Instructions"
                  optional
                  multiline
                  placeholder="e.g. Ring bell twice, leave at door…"
                  value={form.deliveryInstructions}
                  onChangeText={(v) => updateField("deliveryInstructions", v)}
                />
              </View>
            </View>

            <View style={styles.divider} />

            {/* Label Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Address Label</Text>
              <View style={styles.chipsRow}>
                {ADDRESS_LABELS.map((lbl) => (
                  <LabelChip
                    key={lbl}
                    label={lbl}
                    active={form.label === lbl}
                    onPress={(v) => updateField("label", v)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.divider} />

            {/* Receiver Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Receiver Details</Text>
              <View style={styles.fieldGroup}>
                <FormField
                  label="Receiver's Name"
                  required
                  placeholder="Full name"
                  value={form.receiverName}
                  onChangeText={(v) => updateField("receiverName", v)}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
                <PhoneField
                  value={form.phoneNumber}
                  onChangeText={(v) => updateField("phoneNumber", v)}
                />
              </View>
            </View>

            <View style={styles.divider} />

            {/* Preferences Section */}
            {/* <View style={[styles.section]}>
              <Text style={styles.sectionTitle}>Preferences</Text>
              <View style={[styles.toggleRow]}>
                <View>
                  <Text style={styles.toggleLabel}>Set as default address</Text>
                  <Text style={styles.toggleSub}>
                    Used automatically at checkout
                  </Text>
                </View>
                <Switch
                  value={form.isDefault}
                  onValueChange={(v) => updateField("isDefault", v)}
                  trackColor={{ false: COLORS.border, true: COLORS.brand }}
                  thumbColor={COLORS.surface}
                  ios_backgroundColor={COLORS.border}
                />
              </View>
            </View> */}

            {/* Save Button */}
            <View style={styles.saveSection}>
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  (!isValid || loading) && styles.saveButtonDisabled,
                ]}
                onPress={handleSave}
                disabled={!isValid || loading}
                activeOpacity={0.85}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.surface} />
                ) : (
                  <Text style={styles.saveButtonText}>SAVE ADDRESS</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}