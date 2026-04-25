import React, { useState, useRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MapView from "react-native-maps";
import { Marker, MapPressEvent } from "react-native-maps";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

import {
  styles,
  PINK,
  HEADER_HEIGHT,
  CARD_HEIGHT,
} from "./style/mapScreen.style";

const { width } = Dimensions.get("window");
interface Address {
  id: string;
  full: string;
  city: string | null;
  lat: number;
  lng: number;
}

interface PlaceSuggestion {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
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

export default function LocationInfoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lat: string; lon: string }>();

  const latitude = parseFloat(params.lat as string) || 12.9716;
  const longitude = parseFloat(params.lon as string) || 77.5946;

  const mapRef = useRef<MapView>(null);
  const slideAnim = useRef(new Animated.Value(80)).current;

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

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 60,
      friction: 10,
    }).start();
  }, []);

  // Reverse geocode when pin moves
  useEffect(() => {
    if (isDragging) return; // Don't geocode while dragging
    setIsGeocoding(true);
    const timeout = setTimeout(async () => {
      try {
        const results = await Location.reverseGeocodeAsync(pinCoord);
        if (results.length > 0) {
          const r = results[0];
          setAddress(r.street ?? r.name ?? "Unknown location");
          setSubAddress(
            [r.district, r.subregion, r.city].filter(Boolean).join(", "),
          );
        }
      } catch {
        setAddress("Could not resolve address");
      } finally {
        setIsGeocoding(false);
      }
    }, 500); // Debounce 500ms after drag ends
    return () => clearTimeout(timeout);
  }, [pinCoord, isDragging]);

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

  useEffect(() => {
    if (!userLocation) return;
    setDistanceKm(
      haversineKm(
        userLocation.latitude,
        userLocation.longitude,
        pinCoord.latitude,
        pinCoord.longitude,
      ),
    );
  }, [pinCoord, userLocation]);

  const isFarAway = distanceKm !== null && distanceKm > 50;

  // Move pin by tapping on map
  const handleMapPress = (e: MapPressEvent) => {
    const coord = e.nativeEvent.coordinate;
    setPinCoord(coord);
    mapRef.current?.animateToRegion(
      { ...coord, latitudeDelta: 0.05, longitudeDelta: 0.05 },
      300,
    );
  };

  // Snap map to pin after drag
  const handleDragEnd = (e: any) => {
    const coord = e.nativeEvent.coordinate;
    setPinCoord(coord);
    setIsDragging(false);
    mapRef.current?.animateToRegion(
      { ...coord, latitudeDelta: 0.05, longitudeDelta: 0.05 },
      300,
    );
  };

  // Move pin to user's current location
  const handleMyLocation = async () => {
    if (!userLocation) return;
    setPinCoord(userLocation);
    mapRef.current?.animateToRegion(
      { ...userLocation, latitudeDelta: 0.05, longitudeDelta: 0.05 },
      500,
    );
  };
  const insets = useSafeAreaInsets();

  const handleConfirm = async () => {
    const addressData: Address = {
      id: Date.now().toString(),
      full: subAddress,
      city: address.split(",")[1]?.trim() ?? null,
      lat: pinCoord.latitude,
      lng: pinCoord.longitude,
    };

    // Get existing list
    const existing = await AsyncStorage.getItem("user_addresses");
    const parsed: Address[] = existing ? JSON.parse(existing) : [];

    // Append new address
    const updated = [...parsed, addressData];
    await AsyncStorage.setItem("user_addresses", JSON.stringify(updated));

    // Save as selected
    await AsyncStorage.setItem("selected_address", JSON.stringify(addressData));

    router.navigate("/(home)/home");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Location Information</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        onPress={handleMapPress} // ✅ Tap anywhere to move pin
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
          onDrag={(e) => setPinCoord(e.nativeEvent.coordinate)} // ✅ Live update while dragging
          onDragEnd={handleDragEnd}
          pinColor="#E91E8C"
        />
      </MapView>

      {/* Tooltip */}
      {!isDragging && (
        <View
          style={[styles.tooltipWrapper, { top: insets.top + 120 }]}
          pointerEvents="none"
        >
          <View style={styles.tooltip}>
            <Text style={styles.tooltipTitle}>
              Order will be delivered here
            </Text>
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
          <Text style={styles.draggingText}> Move to your exact location</Text>
        </View>
      )}

      {/* Recenter to pin FAB */}
      <TouchableOpacity
        style={styles.recenterBtn}
        onPress={() =>
          mapRef.current?.animateToRegion(
            { ...pinCoord, latitudeDelta: 0.05, longitudeDelta: 0.05 },
            500,
          )
        }
      >
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
                {!!subAddress && (
                  <Text style={styles.addressSub} numberOfLines={1}>
                    {subAddress}
                  </Text>
                )}
              </>
            )}
          </View>
        </View>

        {isFarAway && distanceKm !== null && (
          <View style={styles.warningRow}>
            <Ionicons name="warning-outline" size={14} color={PINK} />
            <Text style={styles.distanceWarning}>
              {" "}
              Pin is {distanceKm.toFixed(1)} km away from your current location
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.confirmBtn, isGeocoding && styles.confirmBtnDisabled]}
          activeOpacity={0.85}
          disabled={isGeocoding}
          onPress={handleConfirm}
        >
          {isGeocoding ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmText}>Confirm & Continue</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
