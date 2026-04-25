// MapScreenPage.tsx

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import { Marker, MapPressEvent } from "react-native-maps";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

import { styles, PINK } from "./style/savedAddressMapScreenPage.style";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const DEFAULT_LAT = 12.9716;
const DEFAULT_LON = 77.5946;

// ─── Component ────────────────────────────────────────────────────────────────

export default function SavedAddressMapScreenPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lat: string; lon: string }>();
  const insets = useSafeAreaInsets();

  const latitude = params.lat ? parseFloat(params.lat) : DEFAULT_LAT;
  const longitude = params.lon ? parseFloat(params.lon) : DEFAULT_LON;

  // ── Refs ───────────────────────────────────────────────────────────────────
  const mapRef = useRef<MapView>(null);
  const slideAnim = useRef(new Animated.Value(80)).current;

  // ── State ─────────────────────────────────────────────────────────────────
  const [pinCoord, setPinCoord] = useState({ latitude, longitude });
  const [address, setAddress] = useState("Fetching address…");
  const [subAddress, setSubAddress] = useState("");
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ── Slide-up animation on mount ───────────────────────────────────────────
  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 60,
      friction: 10,
    }).start();
  }, []);

  // ── Reverse geocode when pin settles ──────────────────────────────────────
  useEffect(() => {
    if (isDragging) return;
    setIsGeocoding(true);
    const timeout = setTimeout(async () => {
      try {
        const results = await Location.reverseGeocodeAsync({
          latitude: pinCoord.latitude,
          longitude: pinCoord.longitude,
        });
        if (results && results.length > 0) {
          const r = results[0];
          setAddress(r.street ?? r.name ?? r.district ?? "Unknown location");
          setSubAddress(
            [r.district, r.subregion, r.city].filter(Boolean).join(", ")
          );
        } else {
          setAddress("No address found");
        }
      } catch (err) {
        console.error("Geocode error:", err);
        setAddress("Could not resolve address");
      } finally {
        setIsGeocoding(false);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [pinCoord, isDragging]);

  // ── Request user location once ────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const loc = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  // ── Recompute distance when pin or user location changes ──────────────────
  useEffect(() => {
    if (!userLocation) return;
    setDistanceKm(
      haversineKm(
        userLocation.latitude,
        userLocation.longitude,
        pinCoord.latitude,
        pinCoord.longitude
      )
    );
  }, [pinCoord, userLocation]);

  const isFarAway = distanceKm !== null && distanceKm > 50;

  // ── Map interaction handlers ──────────────────────────────────────────────
  const handleMapPress = useCallback((e: MapPressEvent) => {
    const coord = e.nativeEvent.coordinate;
    setPinCoord(coord);
    mapRef.current?.animateToRegion(
      { ...coord, latitudeDelta: 0.05, longitudeDelta: 0.05 },
      300
    );
  }, []);

  const handleDragEnd = useCallback((e: any) => {
    const coord = e.nativeEvent.coordinate;
    setPinCoord(coord);
    setIsDragging(false);
    mapRef.current?.animateToRegion(
      { ...coord, latitudeDelta: 0.05, longitudeDelta: 0.05 },
      300
    );
  }, []);

  const handleMyLocation = useCallback(async () => {
    if (!userLocation) return;
    setPinCoord(userLocation);
    mapRef.current?.animateToRegion(
      { ...userLocation, latitudeDelta: 0.05, longitudeDelta: 0.05 },
      500
    );
  }, [userLocation]);

  const handleRecenter = useCallback(() => {
    mapRef.current?.animateToRegion(
      { ...pinCoord, latitudeDelta: 0.05, longitudeDelta: 0.05 },
      500
    );
  }, [pinCoord]);

  // ── Back handler ──────────────────────────────────────────────────────────
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  // ── Confirm ───────────────────────────────────────────────────────────────
  const handleConfirm = useCallback(() => {
    const fullAddress = [address, subAddress].filter(Boolean).join(", ");
    router.push({
      pathname: "/user/savedAddress/savedAddressForm",
      params: {
        lat: pinCoord.latitude.toString(),
        lon: pinCoord.longitude.toString(),
        address: fullAddress,
      },
    });
  }, [router, pinCoord, address, subAddress]);

  const isConfirmDisabled = isGeocoding || isSaving;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Location Information</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={pinCoord}
          draggable
          onDragStart={() => setIsDragging(true)}
          onDrag={(e) => setPinCoord(e.nativeEvent.coordinate)}
          onDragEnd={handleDragEnd}
          pinColor="#E91E8C"
        />
      </MapView>

      {/* Tooltip — shown when pin is settled */}
      {!isDragging && (
        <View
          style={[styles.tooltipWrapper, { top: insets.top + 120 }]}
          pointerEvents="none"
        >
          <View style={styles.tooltip}>
            <Text style={styles.tooltipTitle}>Order will be delivered here</Text>
            <Text style={styles.tooltipSub}>
              Drag pin or tap map to change location
            </Text>
          </View>
          <View style={styles.tooltipArrow} />
        </View>
      )}

      {/* Dragging hint */}
      {isDragging && (
        <View style={styles.draggingBanner} pointerEvents="none">
          <Ionicons name="move" size={16} color="#fff" />
          <Text style={styles.draggingText}>Move to your exact location</Text>
        </View>
      )}

      {/* Recenter FAB */}
      <TouchableOpacity style={styles.recenterBtn} onPress={handleRecenter}>
        <Ionicons name="locate-outline" size={22} color="#555" />
      </TouchableOpacity>

      {/* My Location FAB */}
      <TouchableOpacity style={styles.myLocationBtn} onPress={handleMyLocation}>
        <Ionicons name="navigate-circle-outline" size={26} color="#E91E8C" />
      </TouchableOpacity>

      {/* Bottom Card */}
      <Animated.View
        style={[styles.card, { transform: [{ translateY: slideAnim }] }]}
      >
        {/* Address row */}
        <View style={styles.addressRow}>
          <Ionicons
            name="location-sharp"
            size={20}
            color={PINK}
            style={{ marginTop: 3 }}
          />
          <View style={{ flex: 1, marginLeft: 8 }}>
            {isGeocoding ? (
              <ActivityIndicator size="small" color={PINK} />
            ) : (
              <>
                <Text style={styles.addressMain} numberOfLines={1}>
                  {address}
                </Text>
                {subAddress.length > 0 && (
                  <Text style={styles.addressSub} numberOfLines={1}>
                    {subAddress}
                  </Text>
                )}
              </>
            )}
          </View>
        </View>

        {/* Distance warning */}
        {isFarAway && distanceKm !== null && (
          <View style={styles.warningRow}>
            <Ionicons name="warning-outline" size={14} color={PINK} />
            <Text style={styles.distanceWarning}>
              {`Pin is ${distanceKm.toFixed(1)} km from your current location`}
            </Text>
          </View>
        )}

        {/* Confirm button */}
        <TouchableOpacity
          style={[
            styles.confirmBtn,
            isConfirmDisabled && styles.confirmBtnDisabled,
          ]}
          activeOpacity={0.85}
          disabled={isConfirmDisabled}
          onPress={handleConfirm}
        >
          {isConfirmDisabled ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmText}>Confirm & Continue</Text>
          )}
        </TouchableOpacity>
      </Animated.View>

    </View>
  );
}