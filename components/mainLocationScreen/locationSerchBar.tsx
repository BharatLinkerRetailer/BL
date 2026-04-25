// components/SearchBar.tsx
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style/locationSearchBar.style";
import { useState } from "react";
import ResultLocationCard from "./resultLocationCard";

interface PlaceSuggestion {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

export default function SearchBar() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const fetchPlaces = async (text: string) => {
    if (text.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    setSuggestions([
      {
        place_id: "place_delhi",
        display_name: "New Delhi, Delhi, India",
        lat: "28.6139",
        lon: "77.2090",
      },
      {
        place_id: "place_mumbai",
        display_name: "Mumbai, Maharashtra, India",
        lat: "19.0760",
        lon: "72.8777",
      },
      {
        place_id: "place_patna",
        display_name: "Patna, Bihar, India",
        lat: "25.5941",
        lon: "85.1376",
      },
      {
        place_id: "place_bangalore",
        display_name: "Bangalore, Karnataka, India",
        lat: "12.9716",
        lon: "77.5946",
      },
      {
        place_id: "place_kolkata",
        display_name: "Kolkata, West Bengal, India",
        lat: "22.5726",
        lon: "88.3639",
      },
    ]);

    // setIsLoading(true);
    // try {
    //   const res = await fetch(
    //     `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(text)}&format=json&limit=5`,
    //     {
    //       headers: {
    //         "Accept-Language": "en",
    //         "User-Agent": "YourAppName/1.0",
    //       },
    //     },
    //   );
    //   const data: PlaceSuggestion[] = await res.json();
    //   setSuggestions(data);
    // } catch (err) {
    //   console.error("Place search failed:", err);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleChange = (text: string) => {
    setQuery(text);
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      fetchPlaces(text);
    }, 500);
    setDebounceTimer(timer);
  };

  const handleSelect = (place: PlaceSuggestion) => {
    router.push({
      pathname: "/location/mapScreen",
      params: {
        lat: place.lat,
        lon: place.lon,
      },
    });
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
  };

  return (
    <View>
      {/* Search Input */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          placeholder="Search city or place"
          style={styles.searchInput}
          placeholderTextColor="#999"
          value={query}
          onChangeText={handleChange}
        />
        {isLoading ? (
          <ActivityIndicator size="small" color="#ff2d55" />
        ) : query.length > 0 ? (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="close-circle" size={18} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {suggestions.map((item, index) => (
              <TouchableOpacity
                key={item.place_id}
                style={[
                  styles.suggestionItem,
                  index !== suggestions.length - 1 && styles.suggestionBorder,
                ]}
                onPress={() => handleSelect(item)}
                activeOpacity={0.7}
              >
                <ResultLocationCard displayName={item.display_name} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
