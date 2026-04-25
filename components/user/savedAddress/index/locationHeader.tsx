import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style/locationScreen.style";
import { useRouter} from "expo-router";

export default function Header() {
  const router = useRouter();
  const handleBack = () => {
      router.navigate(`/user/userHome` as any);
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
        <Ionicons name="arrow-back" size={20} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Delivery Address</Text>
    </View>
  );
}