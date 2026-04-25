import { useEffect, useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import Header from "./locationHeader";
import SearchBar from "./locationSerchBar";
import LocationOption from "./locationOption";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth"; // ✅
import { styles } from "./style/locationScreen.style";
import { LocationInfo } from "../types";
import { useAddressStore } from "../../../../store/user/address";
import { useUserStore } from "../../../../store/user/user";
import { getAddresses, deleteAddress } from "../../../../firebase/user/address";
import SavedAddressCard from "./savedAddressCard";

import { Address } from "../../../../types/user/deliveryAddress";

export default function IndexSavedAddressScreen() {
  const user = auth().currentUser;

  const { addresses, setAddresses, deleteAddress: removeFromStore, setSelectedAddress } = useAddressStore();
  const {userData}= useUserStore();

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user?.uid) return;
      try {
        const data = await getAddresses(user.uid);
        setAddresses(data);
        setSelectedId(userData?.defaultAddressId ?? "");

      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    fetchAddresses();
  }, [user?.uid]);

  const redirectToSavedAddress = (latitude: number, longitude: number) => {
    router.push({
      pathname: "/user/savedAddress/savedAddressMap",
      params: { lat: latitude, lon: longitude },
    });
  };

  const onConfirm = (locationData: LocationInfo) => {
    if (locationData.latitude && locationData.longitude) {
      redirectToSavedAddress(locationData.latitude, locationData.longitude);
    }
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
    setIsLoadingLocation(false);
    redirectToSavedAddress(latitude, longitude);
  };

  const handleSelect = (id: string) => {
    const address = addresses.find((a) => a.id === id) ?? null;
    setSelectedId(id);
    setSelectedAddress(address);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAddress(user!.uid, id); // Firestore delete
              removeFromStore(id);                // Zustand store sync
              if (selectedId === id) setSelectedId(null);
            } catch (error) {
              Alert.alert("Error", "Failed to delete address.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header />
        <SearchBar onConfirm={onConfirm} />

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

        {addresses.length > 0 && (
          <View style={styles.card}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {addresses.map((address, index) => (
                <SavedAddressCard
                  key={address.id}
                  id={address.id ?? " "}
                  icon="location-outline"
                  address={address as Address}
                  canDelete                           
                  isLast={index === addresses.length - 1}
                  isSelected={selectedId === address.id}
                  onSelect={handleSelect}
                  onDelete={handleDelete}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}