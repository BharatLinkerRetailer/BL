import { View, Text, Pressable, BackHandler, ScrollView } from "react-native";
import Header from "./locationHeader";
import SearchBar from "./locationSerchBar";
import LocationOption from "./locationOption";
import SavedLocationCard from "./savedLocationCard";
import { styles } from "./style/locationScreen.style";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

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

export default function LocationScreen() {
  const router = useRouter();
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    loadAddresses();
    loadSelectedId();
  }, []);

  const loadAddresses = async (activeId?: string) => {
    const data = await AsyncStorage.getItem("user_addresses");
    if (!data) return;

    const parsed: Address[] = JSON.parse(data);

    const sorted = [...parsed].sort((a, b) => {
      if (a.id === activeId) return -1;
      if (b.id === activeId) return 1;
      return 0;
    });

    setSavedAddresses(sorted);
  };

  const loadSelectedId = async () => {
    const data = await AsyncStorage.getItem("selected_address");
    if (data) {
      const parsed: Address = JSON.parse(data);
      setSelectedId(parsed.id);
    }
  };

  const saveAddresses = async (addresses: Address[]) => {
    await AsyncStorage.setItem("user_addresses", JSON.stringify(addresses));
    setSavedAddresses(addresses);
  };

  const handleEnableLocation = async () => {
    setIsLoadingLocation(true);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied");
      setIsLoadingLocation(false);
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = loc.coords;
    if (latitude && longitude) {
      router.push({
        pathname: "/location/mapScreen",
        params: {
          lat: latitude,
          lon: longitude,
        },
      });
    }

    setIsLoadingLocation(false);
  };

  const handleDelete = async (id: string) => {
    const updated = savedAddresses.filter((a) => a.id !== id);
    await saveAddresses(updated);

    if (selectedId === id) {
      setSelectedId(null);
      await AsyncStorage.removeItem("selected_address");
    }
  };

  const handleSelect = async (id: string) => {
    setSelectedId(id);

    const selected = savedAddresses.find((a) => a.id === id);
    if (selected) {
      await AsyncStorage.setItem("selected_address", JSON.stringify(selected));
    }
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header />

        <SearchBar />

        <View style={styles.card}>
          <LocationOption
            icon="locate-outline"
            title="Use my Current Location"
            subtitle="Give Permission Us To Use Your Location"
            button="Use"
            isLoadingLocation={isLoadingLocation}
            onPress={handleEnableLocation}
          />
          <LocationOption
            icon="add"
            title="Use Whatsapp to import location"
            isLast
          />
        </View>

        {savedAddresses.length > 0 && (
          <View style={styles.card}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {savedAddresses.map((address, index) => (
                <SavedLocationCard
                  key={address.id}
                  id={address.id}
                  icon="location"
                  title={address.full}
                  subtitle="Saved Address"
                  delete="yes"
                  isLast={index === savedAddresses.length - 1}
                  isSelected={selectedId === address.id}
                  onSelect={handleSelect}
                  onDelete={() => handleDelete(address.id)}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}
