import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style/locationSearchBar.style";
import { useState } from "react";
import ResultLocationCard from "./resultLocationCard";
import { LocationInfo } from "../types";

import { PlaceSuggestion } from "../types";

type Props = {
  onConfirm: (location: LocationInfo) => void;
};
export default function SearchBar({ onConfirm }: Props) {
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
    ]);
  };

  const handleChange = (text: string) => {
    setQuery(text);

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      fetchPlaces(text);
    }, 500);

    setDebounceTimer(timer);
  };

  // ✅ MAIN FIX HERE
  const handleSelect = (place: PlaceSuggestion) => {
    const location: LocationInfo = {
      name: place.display_name.split(",")[0], // short name
      subText: place.display_name,
      latitude: parseFloat(place.lat),
      longitude: parseFloat(place.lon),
    };

    onConfirm(location);
    setSuggestions([]);
    setQuery(place.display_name);
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

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            {suggestions.map((item, index) => (
              <TouchableOpacity
                key={item.place_id}
                style={[
                  styles.suggestionItem,
                  index !== suggestions.length - 1 && styles.suggestionBorder,
                ]}
                onPress={() => handleSelect(item)}
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